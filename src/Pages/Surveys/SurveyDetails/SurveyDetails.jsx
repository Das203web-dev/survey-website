import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BiSolidLike, BiSolidDislike, BiDotsVerticalRounded } from 'react-icons/bi';
import { VscComment } from 'react-icons/vsc';
import { MdReportProblem } from 'react-icons/md';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import UseAxios from '@/Hooks/UseAxios';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import UseVotedSurveyData from '@/Hooks/UseVotedSurveyData';
import showToast from '@/components/Toast/toast';
import UseComment from '@/Hooks/UseComment';
import formatRelativeTime from '@/components/TimeFormat/timeformat';
import UseSuperAdmin from '@/Hooks/UseSuperAdmin';
import UseSingleAdmin from '@/Hooks/UseSingleAdmin';
import { FiEdit } from "react-icons/fi";
import { RiChatDeleteLine } from "react-icons/ri";

const SurveyDetails = () => {
    const { _id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxios();
    const [openModal, setOpenModal] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [commentBox, setCommentBox] = useState(false);
    const [isProUser, setIsProUser] = useState(false);
    const [currentSurveyId, setCurrentSurveyId] = useState(_id);
    const [comments, updateComment] = UseComment();
    const [comment, setComment] = useState([]);
    const [editCommentId, setEditCommentId] = useState(null); // State to keep track of the comment being edited
    const [isSuperAdmin] = UseSuperAdmin();
    const [admin] = UseSingleAdmin();
    const [votedSurveyData, refetchVotedData] = UseVotedSurveyData();
    const [commentEdit, setCommentEdit] = useState(false)

    const fetchSurveyDetails = async (id) => {
        const res = await axiosPublic.get(`/survey/${id}`);
        return res.data;
    };

    const { data: details = {}, refetch } = useQuery({
        queryKey: ['details', currentSurveyId],
        queryFn: () => fetchSurveyDetails(currentSurveyId),
    });

    const handleSurveyDetailsClick = (survey) => {
        setCurrentSurveyId(survey._id);
        checkUserVoteStatus(survey._id);
        updateComment();
    };

    useEffect(() => {
        const res = comments.filter(comment => comment.surveyId === currentSurveyId);
        if (res) {
            const newestComment = res.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setComment(newestComment);
        }
    }, [comments, currentSurveyId, updateComment]);

    useEffect(() => {
        axiosPublic.get(`/userData`)
            .then(res => {
                const matchedUser = res.data.find(userInfo => userInfo.email === user.email);
                if (matchedUser?.role === "pro_user") {
                    setIsProUser(true);
                }
            });
    }, [user, axiosPublic]);

    const checkUserVoteStatus = async (surveyId) => {
        if (user) {
            const userEmail = user.email;
            const survey = await axiosPublic.get(`/survey/${surveyId}`);
            const votedUsers = survey.data.result.voted_users || [];
            setHasVoted(votedUsers.includes(userEmail));
        }
    };

    useEffect(() => {
        checkUserVoteStatus(currentSurveyId);
    }, [isProUser, user, currentSurveyId]);

    const handleVote = async (surveyId) => {
        const userEmail = user.email;

        if (isProUser || admin || isSuperAdmin) {
            const findUnique = votedSurveyData.find(data => data?.votedSurvey?.userEmail === userEmail && data?.votedSurvey?.surveyId === surveyId);

            if (!findUnique) {
                try {
                    const res = await axiosSecure.patch(`survey/${surveyId}`, { email: userEmail });

                    if (res.data.modifiedCount > 0) {
                        await refetch();
                        await checkUserVoteStatus(surveyId);

                        const votedSurveyIs = { surveyId, userEmail };
                        const voteRes = await axiosSecure.post('votedSurveyData', { votedSurvey: votedSurveyIs });

                        if (voteRes.data) {
                            showToast("Thanks for voting us", 'success');
                            refetchVotedData();
                        }
                    }
                } catch (error) {
                    console.error("Error during voting:", error);
                    showToast(`${error.message}`, "error");
                }
            } else {
                showToast("You have already voted this survey", "error");
            }
        } else {
            setOpenModal(true);
        }
    };

    const handleComment = (e, surveyId) => {
        if (isProUser || admin || isSuperAdmin) {
            setCommentBox(true);
            e.preventDefault();
            const form = e.target;
            const comment = form.comment.value;
            const userName = user.displayName;
            const commentInfo = {
                comment,
                userName,
                surveyId
            };
            axiosSecure.post('comments', commentInfo)
                .then(res => {
                    if (res.data.acknowledged) {
                        form.comment.value = '';
                        form.comment.style.height = 'auto'; // Reset the height of the textarea after submission
                        updateComment();
                    }
                });
        } else {
            showToast("You have to become a pro user", 'error');
            setOpenModal(true);
        }
    };

    const handleModify = (id) => {
        // Logic for handling the modification of the comment
        console.log("Modify comment ID:", id);
        setCommentEdit(true)
        const response = axiosSecure.patch(`/comment/${id}`);
        console.log(response, 'line 496');
    };

    const handleDeleteComment = (id) => {
        axiosPublic.delete(`/comment/${id}`)
            .then(res => {
                if (res.status === 200) {
                    updateComment();
                    showToast(`${res?.data?.message}`, 'success');
                } else {
                    showToast("Something went wrong", 'error');
                }
            });
    };

    const renderSurveyDetails = (survey) => (
        <div className='w-full col-span-2 h-auto relative text-black'>
            <Card className='shadow shadow-slate-400'>
                <CardHeader>
                    <CardTitle>{survey.title}</CardTitle>
                    <CardDescription className='text-base font-medium mt-2'>{survey.description}</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2 font-normal'>
                    <p className='text-lg font-medium'>{survey.long_description}</p>
                    <p>{survey.category}</p>
                    <p>Start Date: {survey.start_date}</p>
                    <p>End Date: {survey.end_date}</p>
                    <p>Created By: {survey.created_by}</p>
                    <p>Total Votes: {survey.total_votes}</p>
                </CardContent>
                <CardFooter>
                    <div className='flex justify-between items-center gap-2'>
                        <button className='text-2xl text-slate-600 hover:text-primary/90'>
                            <BiSolidLike />
                        </button>
                        <Button onClick={() => handleVote(survey._id)} variant="outline">Vote</Button>
                        {!isProUser && (
                            <AlertDialog open={openModal} onOpenChange={setOpenModal}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="font-bold text-2xl">Do You Want to Vote?</AlertDialogTitle>
                                        <AlertDialogDescription className="font-medium">
                                            Please become our PRO USER.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-green-500 bg-opacity-35">
                                            <Link to={'/pro'}>Continue</Link>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        <button className='text-2xl text-slate-600 hover:text-primary/90'>
                            <BiSolidDislike />
                        </button>
                    </div>
                    <div onClick={() => setCommentBox(!commentBox)}>
                        <button onClick={() => handleComment(currentSurveyId)}>
                            <VscComment className='text-2xl text-slate-600 hover:text-primary/90' />
                        </button>
                    </div>
                    <button>
                        <MdReportProblem className='text-2xl text-slate-600 hover:text-primary/90' />
                    </button>
                </CardFooter>
            </Card>
            {/* Comment Section */}
            <div className={`my-2 flex gap-5 flex-col bg-white w-full rounded-md text-black focus:outline-none px-5 py-2 shadow shadow-slate-400 ${commentBox ? 'block' : 'hidden'}`}>
                <div className='w-fit'>
                    <p className='text-xl font-medium'>Comments</p>
                    <div className='w-full h-[0.2px] bg-black'></div>
                </div>
                {(isProUser || admin || isSuperAdmin) && (
                    <form onSubmit={(e) => handleComment(e, currentSurveyId)} className='flex rounded-md flex-col items-baseline gap-2'>
                        <textarea
                            className='w-full bg-transparent focus:outline-none border-b-[.5px] border-b-black resize-none overflow-hidden'
                            name="comment"
                            id="comment"
                            placeholder='Add a comment'
                            rows="1"
                            onInput={e => {
                                e.target.style.height = 'auto'; // Reset the height to auto to start fresh
                                e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height to the scrollHeight
                            }}
                            style={{ lineHeight: '1.5', padding: '0.5rem 0' }} // Optional: add padding for better UX
                        ></textarea>
                        <input className='text-right bg-slate-300 border-[0.5px] cursor-pointer hover:bg-white hover:text-black font-semibold p-2 rounded-md w-fit' type="submit" value="Submit" />
                    </form>
                )}
                <div className='flex w-full flex-col justify-between gap-5 h-fit max-h-48 overflow-y-scroll hide-scrollbar'>
                    {comment.map(c => (
                        <div className='flex justify-between gap-5 w-full relative' key={c._id}>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-md font-medium flex gap-5 items-center'>{c.userName} <span className='text-xs'>{formatRelativeTime(c?.timestamp)}</span></h1>
                                <p className='text-sm text-wrap'>{c.comment}</p> :
                                <form onSubmit={(e) => handleComment(e, currentSurveyId)} className='flex rounded-md flex-col items-baseline gap-2'>
                                    <textarea
                                        className='w-full bg-transparent focus:outline-none border-b-[.5px] border-b-black resize-none overflow-hidden'
                                        name="comment"
                                        id="comment"
                                        placeholder={c.comment}
                                        rows="1"
                                        onInput={e => {
                                            e.target.style.height = 'auto'; // Reset the height to auto to start fresh
                                            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height to the scrollHeight
                                        }}
                                        style={{ lineHeight: '1.5', padding: '0.5rem 0' }} // Optional: add padding for better UX
                                    ></textarea>
                                    <input className='text-right bg-slate-300 border-[0.5px] cursor-pointer hover:bg-white hover:text-black font-semibold p-2 rounded-md w-fit' type="submit" value="Submit" />
                                </form>
                            </div>
                            <div className=''>
                                <div className='cursor-pointer' onClick={() => setEditCommentId(editCommentId === c._id ? null : c._id)}>
                                    <BiDotsVerticalRounded />
                                </div>
                                {editCommentId === c._id && (
                                    <div className='bg-slate-200 shadow-lg shadow-slate-500 p-2 rounded-md flex flex-col gap-1 text-sm absolute top-0 right-4 w-auto'>
                                        <div onClick={() => handleModify(c._id)} className='hover:bg-slate-300 rounded-md p-1 cursor-pointer'>
                                            <p className='flex items-center gap-1'><FiEdit></FiEdit> Edit</p>
                                        </div>
                                        <div onClick={() => handleDeleteComment(c._id)} className='hover:bg-slate-300 rounded-md p-1 cursor-pointer'>
                                            <p className='flex items-center gap-1'><RiChatDeleteLine></RiChatDeleteLine> Delete</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className='md:w-3/4 md:px-0 p-5 mx-auto py-10 md:grid md:grid-cols-3 flex flex-col justify-center gap-10'>
            {details.result && renderSurveyDetails(details.result)}
            {details.result && (
                <div className='h-fit bg-opacity-5 shadow shadow-slate-400 rounded-lg flex flex-col gap-5 p-5'>
                    <CardTitle>Similar Items</CardTitle>
                    {details.category && details.category.map(data => (
                        <Card key={data._id} className="hover:shadow-sm hover:shadow-slate-100">
                            <CardHeader className='space-y-2 text-lg font-normal'>
                                <CardTitle>{data.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 flex-grow">
                                <div className="space-y-3">
                                    <p className="text-xl font-medium">{data.description}</p>
                                    <p className="text-lg font-medium">Vote: {data.total_votes}</p>
                                    <p className="font-medium text-lg">{data.category}</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full button-custom"
                                    onClick={() => handleSurveyDetailsClick(data)}
                                >
                                    Survey Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SurveyDetails;

