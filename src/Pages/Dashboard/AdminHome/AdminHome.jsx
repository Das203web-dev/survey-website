import UseSurveyData from '@/Hooks/UseSurveyData';
import LikedSurveyChart from '@/components/Chart/LikedSurveyChart';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const AdminHome = () => {

    const [surveyData] = UseSurveyData();

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <h2 className='text-center text-2xl underline mb-10'>Chart Based on Survey</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={surveyData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis className='md:text-xs text-[8px]' dataKey="category" />
                    <YAxis />
                    <Bar dataKey="total_votes" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {surveyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            <h2 className='text-center text-2xl underline mb-10'>Pie Chart Based on Vote</h2>
            <LikedSurveyChart survey={surveyData}></LikedSurveyChart>

        </div>
    );
};

export default AdminHome;
