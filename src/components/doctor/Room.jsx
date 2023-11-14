import { useParams } from "react-router-dom"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
const Room = () => {
    const { roomId } = useParams()
    const myMeeting = async (element) => {
        const appID = 295532794;
        const serverSecret = "499cadd24338635b718aef347a55e3e1";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "You")
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `https://vc-green.vercel.app/doctor/room/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,

            },
            showScreenSharingButton: false
        })
    }
    return (
        <div>
            <div ref={myMeeting} style={{ width: '100vw', height: '100vh' }} />
        </div>
    )
}
export default Room
