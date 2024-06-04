import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
import { MdReportProblem } from "react-icons/md";
import { useContext, useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UseAxios from '@/Hooks/UseAxios';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import UseVotedSurveyData from '@/Hooks/UseVotedSurveyData';
import showToast from '@/components/Toast/toast';
import UserData from '@/Hooks/UserData';
import UseComment from '@/Hooks/UseComment';
import { comment } from 'postcss';
import formatRelativeTime from '@/components/TimeFormat/timeformat';
// import { Bounce, toast } from 'react-toastify';
// import Toast from '@/components/Toast/Toast';

const SurveyDetails = () => {
    const { _id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxios();
    const [openModal, setOpenModal] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [isProUser, setIsProUser] = useState(false);
    const [currentSurveyId, setCurrentSurveyId] = useState(_id);
    const [comments, updateComment] = UseComment();
    const [comment, setComment] = useState([])


    const [userInfos] = UserData()

    const [votedSurveyData, refetchVotedData] = UseVotedSurveyData();

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
    };

    // const filterComments = ()=>{
    useEffect(() => {
        const filteredComments = comments.filter(comment => comment.surveyId === _id);
        if (filteredComments) {
            setComment(filteredComments)
        }
    }, [comments, _id])
    // }

    console.log(comment, 'line 64');

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

        if (isProUser) {
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
                            showToast("Thanks for voting us", 'success')
                            refetchVotedData();
                        }
                    }
                } catch (error) {
                    console.error("Error during voting:", error);
                    showToast(`${error.message},"error"`)
                }
            } else {
                showToast("You have already voted this survey", "error")
            }
        } else {
            setOpenModal(true);
        }
    };

    const handleComment = (e, surveyId) => {
        console.log('survey clicked', surveyId);
        e.preventDefault()
        if (isProUser) {
            const form = e.target;
            const comment = form.comment.value;
            const userName = user.displayName;
            const commentInfo = {
                comment,
                userName,
                surveyId
            }
            axiosSecure.post('comments', commentInfo)
                .then(res => {
                    updateComment()
                    console.log(res.data);
                })
            console.log(comment);
        }
    }

    const renderSurveyDetails = (survey) => (
        <div className='w-full col-span-2'>
            <Card>
                <CardHeader>
                    <CardTitle>{survey.title}</CardTitle>
                    <CardDescription>{survey.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{survey.long_description}</p>
                    <p>{survey.category}</p>
                    <p>Start Date : {survey.start_date}</p>
                    <p>End date : {survey.end_date}</p>
                    <p>created by : {survey.created_by}</p>
                    <p>{survey.total_votes}</p>
                </CardContent>
                <CardFooter>
                    <div className='flex justify-between items-center gap-2'>
                        <button className='text-3xl bg-clip-text text-yellow-200'>
                            <BiSolidLike />
                        </button>
                        <Button onClick={() => handleVote(survey._id)} variant="outline">Vote</Button>

                        {!isProUser && (
                            <AlertDialog open={openModal} onOpenChange={setOpenModal}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="font-bold text-2xl">Do You want to vote us?</AlertDialogTitle>
                                        <AlertDialogDescription className="font-medium">
                                            Please become our PRO USER.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-green-500 bg-opacity-35"><Link to={'/pro'}>Continue</Link></AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}

                        <button className='text-3xl bg-clip-text text-yellow-200'>
                            <BiSolidDislike />
                        </button>
                    </div>
                    <button onClick={() => handleComment(survey._id)}>
                        <VscComment className='text-3xl bg-clip-text text-yellow-200' />
                    </button>
                    <button>
                        <MdReportProblem className='text-3xl bg-clip-text text-yellow-200' />
                    </button>
                </CardFooter>
            </Card>
            {/* comment div  */}
            {comment.length > 0 && <div className='my-5 flex gap-5 flex-col bg-[#0D0D0D] w-full rounded-md text-white focus:outline-none px-5 py-2 shadow-sm shadow-[#00ffff9d]'>
                <p className='text-xl font-medium'>Comments</p>
                {isProUser && <form onSubmit={(e) => handleComment(e, survey._id)} className='flex rounded-md flex-col gap-2'>
                    <textarea style={{ resize: 'none' }} className=' w-full p-0 bg-transparent focus:outline-none border-b-[.5px] overflow-hidden border-b-[#ffffff5d]' name="comment" id=""></textarea>
                    <input className='text-right bg-white bg-opacity-20 p-2 rounded-md w-fit' type="submit" value="Submit" />
                </form>}
                <div className='flex flex-col gap-5 h-52 overflow-y-scroll hide-scrollbar'>
                    {
                        comment.map(c => <div className='flex flex-col gap-1' key={c._id}>
                            <h1 className='text-lg font-medium flex gap-5 items-center'>{c.userName} <span className='text-sm'>{formatRelativeTime(c?.timestamp)}</span></h1>
                            <p className='text-md'>{c.comment}</p>
                        </div>)
                    }
                </div>
            </div>}
        </div>
    );

    return (
        <div className='md:w-3/4 md:px-0 p-5 mx-auto py-10 md:grid md:grid-cols-3 flex flex-col justify-center gap-10'>
            {details.result && renderSurveyDetails(details.result)}
            {details.result && <div className='h-fit bg-white bg-opacity-5 shadow-sm shadow-[#00ffff9d] text-white rounded-lg flex flex-col gap-5 p-5'>
                <CardTitle>Similar Items</CardTitle>
                {details.category && details.category.map(data => (
                    <Card key={data._id} className="hover:shadow-sm hover:shadow-slate-100">
                        <CardHeader className=''>
                            <CardTitle>{data.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 flex-grow">
                            <div className="space-y-3">
                                <p className="text-xl font-medium">{data.description}</p>
                                <p className="text-lg font-medium">Vote : {data.total_votes}</p>
                                <p className="font-medium text-lg">{data.category}</p>
                            </div>
                        </CardContent>
                        <CardFooter className=''>
                            <Button
                                className="w-full bg-white bg-opacity-10"
                                onClick={() => handleSurveyDetailsClick(data)}
                            >
                                Survey details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>}
        </div>
    );
};

export default SurveyDetails;

