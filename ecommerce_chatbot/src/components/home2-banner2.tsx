import Image from "next/image"
import Button from "./button"
export default function Home2Banner2(){
    return(
                <div className="container">
                    <div className="space-y-6 lg:space-y-0 lg:flex gap-x-4 justify-between items-center my-14">
                        <div className="h-[281px] lg:h-[478px] md:w-[630px] lg:w-[634px] bg-dark-primary text-white space-y-4 lg:space-y-0 py-8 lg:my-12">
                            <div className="container ">
                            <p className="font-display text-custom-h4 md:text-custom-h2 lg:pt-2">It started with a small idea</p>
                            <p className="text-body-sm md:w-[400px] lg:w-auto pt-3">A global brand with local beginnings, our story begin in a small studio in South London in early 2014.</p>
                            <div className="pt-14 lg:pt-52"><Button text="View collection" color="bg-white/15" /></div>
                            </div>
                        </div>
                        <Image src="/Image Block.png" alt="" height={478} width={630} />
                    </div>
                    </div>
        
    )
}