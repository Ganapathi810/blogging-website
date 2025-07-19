export default async function Loading() {
    return (
        <div className="animate-pulse p-0 flex justify-center h-[92vh] items-center">
            <div className="grid grid-cols-1 gap-4 mb-9">
                <div className="w-[60vw] h-60 bg-green-300/50 rounded-md"></div>
                <div className="w-[60vw] h-60 bg-green-300/50 rounded-md"></div>
            </div>
        </div>
    ) 
}