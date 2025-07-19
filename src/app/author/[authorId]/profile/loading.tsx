export default function LoadingAuthorProfile() {
    return (
        <div className='py-10 px-5 md:p-10 flex justify-center animate-pulse'>
            <div className="md:max-w-[90vw] md:w-[75vw] w-full">
                <div className="flex gap-3 items-center ml-4">
                    <div className="size-16 md:size-20 rounded-full bg-green-300/50"></div>
                    <div className="text-3xl md:text-4xl font-bold text-wrap w-54 h-10 rounded bg-green-300/50"></div>
                </div>
                <div className="w-full mt-6">
                    <div className="ml-5 text-2xl text-green-500 font-semibold w-32 h-8 rounded bg-green-300/50"></div>
                    <hr className="h-0.5 bg-green-500/40 flex grow ml-4 mr-5 mt-4" />
                </div>
                <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-7 md:p-4">
                    {[1,2,3,4].map((_,i) => (
                        <div key={i} className="h-60 w-full rounded-lg bg-green-300/50"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}