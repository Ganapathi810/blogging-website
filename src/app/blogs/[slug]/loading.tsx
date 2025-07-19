export default function Loading() {
    return (
        <div className="animate-pulse p-0 flex justify-center h-[92vh] items-center">
            <div className="grid grid-cols-1 h-[80vh] w-[70vw]">
                <div className="bg-green-300/50 w-52 rounded h-7 mt-6"></div>
                <div className="bg-green-300/50 w-[68vw] h-14 rounded"></div>
                <div className="flex gap-4 items-center mb-5">
                <div className="flex gap-2 items-center">
                    <div className="bg-green-300/50 rounded-full size-10"></div>
                    <div className="bg-green-300/50 w-48 rounded h-8"></div>
                </div>
                <div className="rounded-xl bg-green-300/50 h-9 w-14 "></div>
                </div>
                <div className="grid grid-cols-1 ">
                <div className="bg-green-300/50 w-[68vw] h-7 rounded"></div>
                <div className="bg-green-300/50 w-[67vw] h-7 rounded"></div>
                <div className="bg-green-300/50 w-[65vw] h-7 rounded"></div>
                <div className="bg-green-300/50 w-[68vw] h-7 rounded"></div>
                </div>

                <div className="grid grid-cols-1 mt-5">
                <div className="bg-green-300/50 w-[65vw] h-7 rounded"></div>
                <div className="bg-green-300/50 w-[63vw] h-7 rounded"></div>
                <div className="bg-green-300/50 w-[65vw] h-7 rounded"></div>
                <div className="bg-green-300/50 w-[61vw] h-7 rounded"></div>
                </div>
            </div>
        </div>
    )
}