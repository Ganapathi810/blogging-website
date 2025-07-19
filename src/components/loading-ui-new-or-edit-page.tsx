export function LoadingUiForNewOrEditPage() {
    return (
        <div className="animate-pulse p-0 flex justify-center h-[92vh] items-center">
            <div className="grid grid-cols-1 h-[80vh] w-[70vw] items-start">
                <div className="bg-green-300/50 w-full h-10 rounded"></div>
                <div className="flex flex-wrap gap-4 w-full justify-center mt-3 sm:mt-2">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((index) => (
                    <div key={index} className="bg-green-300/50 w-8 h-8 md:w-10 md:h-10 rounded"></div>
                    ))}
                    <div className="bg-green-300/50 w-20 h-10 rounded"></div>
                </div>
                <div className="bg-green-300/50 w-full h-[50vh] md:h-[60vh] rounded mt-3"></div>
            </div>
        </div>
    )
}