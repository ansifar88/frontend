import { Card, Typography } from "@material-tailwind/react"
import { UserIcon, AcademicCapIcon } from '@heroicons/react/24/solid'
import Icon from '../../logos/vc-favicon-white.png'
function Dashboard() {
    return (
        <>
            <Card className="shadow-none  m-3">
                <div className="grid  sm:grid-cols-3">

                    <div className="flex justify-center">
                        <Card className="h-36 w-80 bg-[#4caabf] rounded-md p-2 m-2 shadow-sm">
                            <div className="flex">
                                <UserIcon className="h-7 w-7 me-2 text-white" />
                                <Typography variant="h4" className="text-white">USERS</Typography>
                            </div>
                        </Card>
                    </div>

                    <div className="flex justify-center">
                        <Card className="h-36 w-80 bg-[#4caabf] rounded-md p-2 m-2 shadow-sm">
                            <div className="flex">
                                <img src={Icon} className="w-7 h-8 me-2" />
                                <Typography variant="h4" className="text-white">DOCTORS</Typography>
                            </div>
                        </Card>
                    </div>

                    <div className="flex justify-center">
                        <Card className="h-36 w-80 bg-[#4caabf] rounded-md p-2 m-2 shadow-sm">
                            <div className="flex">
                                <AcademicCapIcon className="h-7 w-7 me-2 text-white" />
                                <Typography variant="h4" className="text-white">DEPARTMENTS</Typography>
                            </div>
                        </Card>
                    </div>

                </div>
            </Card>

        </>
    )
}

export default Dashboard
