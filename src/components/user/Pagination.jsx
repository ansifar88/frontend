import { Button, CardFooter, Typography } from '@material-tailwind/react'
import React from 'react'
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const Pagination = () => {
  return (
    <div>
       <CardFooter className="flex items-center justify-between border-t bg-[#5e838b]  p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
        </Typography>
        <div className="flex items-center gap-2 text-white">
          <Button
            variant="text"
            className="flex items-center gap-2 text-white"
            // onClick={() => handlePageChange(page - 1)}
            // disabled={page === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <Typography color="gray" className="font-normal text-white">
            {/* Page <strong className="text-white mx-4">{page}</strong> of{" "} */}
            {/* <strong className="text-white mx-4">{Math.ceil(data.count / data.pageSize)}</strong> */}
          </Typography>
          <Button
            variant="text"
            className="flex items-center gap-2 text-white"
            // onClick={() => handlePageChange(page + 1)}
            // disabled={page === Math.ceil(data.count / data.pageSize)}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </div>
  )
}

export default Pagination
