
import { useNavigate } from 'react-router';
import TitleCard from '~/components/cards/TitleCard';
import { Div, Flex, FlexColumn } from '~/components/general/BaseComponents';
import HeroSection from '~/components/sections/HeroSection';
import { wrapperBaseClass } from '~/utils/constants';
import ChatQuery from '~/apiService/chat/chatQuery';

const AdminThreads = () => {
    const { data, isLoading } = ChatQuery.useQueryGetAdminThreads();
    const threads = data?.threads || [];

    // We might want to view messages in a thread. 
    // This simple view just lists threads.
    // Ideally clicking a thread should open it or navigate to a thread view.

    return (
        <FlexColumn className='w-full'>
            {/* <HeroSection
                title="Admin"
                subtitle="Support Chat"
                description="Manage support threads."
                backgroundImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
            /> */}

            <FlexColumn className={`${wrapperBaseClass}`}>
                <TitleCard title="All Threads" />
                <Flex className='w-full flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-4'>
                    {isLoading && <Div>Loading...</Div>}
                    {threads.length === 0 && !isLoading && <Div>No threads found.</Div>}
                    {threads.map((thread: any, index: number) => (
                        <Div key={thread.id || index} className="p-4 border rounded shadow-md bg-white w-full sm:w-1/2 lg:w-1/3">
                            <h3 className="font-bold">{thread.subject || 'No Subject'}</h3>
                            <p className="text-xs text-gray-400">ID: {thread.id}</p>
                            <p className="text-xs text-gray-400">User ID: {thread.user_id}</p>
                            <p className="text-xs text-gray-400">Created: {new Date(thread.created_at).toLocaleString()}</p>
                        </Div>
                    ))}
                </Flex>
            </FlexColumn>
        </FlexColumn>);
};

export default AdminThreads;
