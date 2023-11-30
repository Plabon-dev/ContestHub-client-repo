
const AboutUs = () => {
    return (
        <div>
            <div>
               
                <section className="p-4 lg:p-8 dark:bg-gray-800 dark:text-gray-100 mt-10">
                    <div>
                        <h2 className="text-4xl font-bold text-center mb-10">What Makes Us Special</h2>
                    </div>
                    <div className="container mx-auto space-y-12">
                        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
                            <img src="https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="h-80 dark:bg-gray-500 aspect-video object-cover" />
                            <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900">

                                <h3 className="text-3xl font-bold">Seamless Contest Creation</h3>
                                <p className="my-6 dark:text-gray-400">: Experience the ease of crafting contests with our user-friendly platform. From setting up engaging tasks to defining prize structures, our intuitive interface makes contest creation a breeze for both beginners and seasoned creators..</p>

                            </div>
                        </div>
                        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
                            <img src="https://images.pexels.com/photos/171198/pexels-photo-171198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="h-80 dark:bg-gray-500 aspect-video object-cover" />
                            <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900">

                                <h3 className="text-3xl font-bold">Dynamic Contest Showcase</h3>
                                <p className="my-6 dark:text-gray-400"> Showcase your contests dynamically with our feature-rich platform. Highlight contest details, participant counts, and captivating images, creating an enticing display that draws participants and celebrates creativity.</p>

                            </div>
                        </div>
                        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
                            <img src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="h-80 dark:bg-gray-500 aspect-video object-cover" />
                            <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900">

                                <h3 className="text-3xl font-bold">Robust Role Management</h3>
                                <p className="my-6 dark:text-gray-400">Take control of your platform with robust role management. Admins, Contest Creators, and Users enjoy tailored functionalities, ensuring a seamless experience whether you're overseeing contests, creating innovative tasks, or participating in the excitement!</p>

                            </div>
                        </div>
                        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
                            <img src="https://images.pexels.com/photos/1480690/pexels-photo-1480690.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="h-80 dark:bg-gray-500 aspect-video" />
                            <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900">

                                <h3 className="text-3xl font-bold">User-Centric Dashboards</h3>
                                <p className="my-6 dark:text-gray-400">Empower users with personalized dashboards. Contestants can track participation, explore winning achievements, and manage profile details, while creators gain insights into created contests, submissions, and overall platform engagement.</p>

                            </div>
                        </div>
                        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
                            <img src="https://images.pexels.com/photos/185576/pexels-photo-185576.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="h-80 dark:bg-gray-500 aspect-video" />
                            <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900">

                                <h3 className="text-3xl font-bold">Data-Driven Insights</h3>
                                <p className="my-6 dark:text-gray-400">Harness the power of data with our insightful analytics. Admins can manage users and contests efficiently, while creators and participants gain valuable insights into engagement patterns, contest popularity, and user statistics.</p>

                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
};

export default AboutUs;