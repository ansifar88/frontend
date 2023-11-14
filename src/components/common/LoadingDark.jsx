import icon from '../../logos/vc-favicon-black.png'
export const Loading = () => {
    return (
        <>
            <div className="h-screen flex justify-center items-center animate-pulse zoomInOut">
                <img src={icon} className="" />
            </div>
        </>
    )
}


