import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";


const ContestCreator = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    const { data: contests = [] } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests');
            return res.data;
        }
    })
    console.log(users);
    const creators = users.filter(creator => creator?.role === 'creator');
    console.log(creators);


    return (
        <div>
            <div className="py-16 bg-cover bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(https://images.pexels.com/photos/459271/pexels-photo-459271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
                <h2 className="font-semibold text-3xl text-center mb-10 text-white">Masters of Creation: Trailblazing Contest Creators</h2>
                <h2 className="w-9/12 mx-auto font-semibold">Embark on a journey through innovation and creativity with our spotlight on the best contest creators. These visionaries have turned imagination into reality, crafting contests that inspire, challenge, and captivate. Meet the trailblazers below, each a maestro in their own right and glace at awe.</h2>

                {/* swiper starts */}
                <div className="flex justify-center flex-col py-10 ">
                    <Swiper
                        autoplay={{ delay: 3000 }}

                        breakpoints={{
                            340: { slidesPerView: 1, spaceBetween: 8 },
                            700: { slidesPerView: 2, spaceBetween: 8 },
                        }}
                        freeMode={true}
                        pagination={{ clickable: true }}
                        modules={[FreeMode, Pagination]}
                        className="max-w-[90%] lg:max-w-[80%]"
                    >
                        {creators.map((creator, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[360px] w-[360px] lg:h-[500px] lg:w-[500px] overflow-hidden cursor-pointer">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${creator?.image || 'https://i.pinimg.com/564x/dd/c2/ba/ddc2baeed75b0aa527c107fab156c584.jpg'})` }}
                                    />
                                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                                    <div className="relative flex flex-col gap-3">
                                        <h1 className="text-xl lg:text-2xl text-orange-300">{creator?.name}</h1>
                                        <p className="lg:text-[18px]">
                                            {contests.filter((contest) => contest?.creator === creator?.email).length} Contests created
                                        </p>
                                        <p className="text-xs"><span className="text-yellow-300">Created Contests: </span>  
                                            {contests
                                                .filter((contest) => contest?.creator === creator?.email)
                                                .map((contest) => contest?.name)
                                                .join(', ')}
                                        </p>
                                        <p className="lg:text-[18px] text-yellow-300 ">

                                            {(() => {
                                                const filteredContests = contests.filter((contest) => contest?.creator === creator?.email);
                                                const maxPrize = Math.max(...filteredContests.map((contest) => contest?.prize || 0));

                                                if (isFinite(maxPrize)) {
                                                    return `Highest Prize Offered: $${maxPrize}`;
                                                } else {
                                                    return null; 
                                                }
                                            })()}
                                        </p>
                                    </div>
                                    <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* swiper ends */}
            </div>
        </div>
    );
};

export default ContestCreator;