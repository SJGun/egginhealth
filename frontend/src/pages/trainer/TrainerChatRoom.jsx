import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from "livekit-client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import VideoComponent from "../../components/common/VideoComponent";
import AudioComponent from "../../components/common/AudioComponent";
import ChatComponent from "../../components/common/ChatComponent"; // 추가
import { useStore } from "../../store/store.js";
import Camera from "../../assets/static/Property_Camera.png"
import LeaveRoom from "../../assets/closebutton.png"
const BASE_URL = import.meta.env.VITE_API_URL;

// For local development, leave these variables empty
// For production, configure them with correct URLs depending on your deployment
let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();

function configureUrls() {
  // If APPLICATION_SERVER_URL is not configured, use default value from local development
  if (!APPLICATION_SERVER_URL) {
    if (window.location.hostname === "localhost") {
      APPLICATION_SERVER_URL = `${BASE_URL}/wrtc/`;
    } else {
      APPLICATION_SERVER_URL =
        "https://" + window.location.hostname + ":6443/rtc/";
    }
  }

  // If LIVEKIT_URL is not configured, use default value from local development
  if (!LIVEKIT_URL) {
    if (window.location.hostname === "localhost") {
      LIVEKIT_URL = "ws://localhost:7880/";
    } else {
      LIVEKIT_URL = "wss://" + window.location.hostname;
    }
  }
}

function TrainerChatRoom() {
  const { trainerId, userId } = useParams();
  const [room, setRoom] = useState(undefined);
  const [localTrack, setLocalTrack] = useState(undefined);
  const [remoteTracks, setRemoteTracks] = useState([]);
  // const [participantName, setParticipantName] = useState("Participant" + Math.floor(Math.random() * 100));
  const userState = useStore((state) => state);
  const participantName = trainerId;
  const roomName = userId;

  async function joinRoom() {
    // Initialize a new Room object
    const room = new Room();
    setRoom(room);

    // Specify the actions when events take place in the room
    // On every new Track received...
    room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
      setRemoteTracks((prev) => [
        ...prev,
        {
          trackPublication: publication,
          participantIdentity: participant.identity,
        },
      ]);
    });

    // On every Track destroyed...
    room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
      setRemoteTracks((prev) =>
        prev.filter(
          (track) => track.trackPublication.trackSid !== publication.trackSid
        )
      );
    });

    try {
      // Get a token from your application server with the room name and participant name
      const rtctoken = await getToken(roomName, participantName);

      // Connect to the room with the LiveKit URL and the token
      await room.connect(LIVEKIT_URL, rtctoken);

      // Publish your camera and microphone
      await room.localParticipant.enableCameraAndMicrophone();
      setLocalTrack(
        room.localParticipant.videoTrackPublications.values().next().value
          .videoTrack
      );
    } catch (error) {
      console.log("There was an error connecting to the room:", error.message);
      await leaveRoom();
    }
  }

  async function leaveRoom() {
    // Leave the room by calling 'disconnect' method over the Room object
    await room?.disconnect();

    // Reset the state
    setRoom(undefined);
    setLocalTrack(undefined);
    setRemoteTracks([]);
  }

  async function getToken(roomName, participantName) {
    APPLICATION_SERVER_URL = `${BASE_URL}/wrtc/`;
    const response = await fetch(APPLICATION_SERVER_URL + "rtctoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: roomName,
        participantName: participantName,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get rtctoken: ${error.errorMessage}`);
    }

        const data = await response.json();
        return data.rtctoken;
    }

    return (
        <>
            {!room ? (
             <div>
                <form className="fixed bottom-[50px] bg-white flex w-[70px] h-[50px] items-center justify-center pr-[5px]"
                    onSubmit={(e) => {
                        joinRoom();
                        e.preventDefault();
                    }}
                >
                    <button
                        className='btn btn-lg btn-success'
                        type='submit'
                        disabled={!roomName || !participantName}
                    >
                        <img src={Camera} alt="카메라" />
                    </button>
                </form>
            <div>   
                {/*수정필요 */}
                <ChatComponent participantName={trainerId} roomName={roomName} receiver={roomName} />
            </div>
             </div>   
            ): (
                <div id='room' className="absolute bg-white top-0 w-screen h-screen z-10">
                    <div id='room-header'>
                        {/* <h2 id='room-title'>{roomName}</h2> */}
                        <button className='btn-danger bg-white absolute bottom-0 flex left-0 right-0 items-center justify-center m-auto bottom-[40px]' id='leave-room-button' onClick={leaveRoom}>
                            <img src={LeaveRoom} alt="" />
                        </button>
                    </div>
                    <div id='layout-container'>
                        <div className="overflow-hidden w-[133px] h-[133px] fixed left-0 bottom-[105px] m-auto flex items-center justify-center z-30 rounded-[19px]">
                            {localTrack && (
                                <VideoComponent
                                    track={localTrack}
                                    participantIdentity={participantName}
                                    local={true}
                                />
                            )}
                        </div>
                        <div className="overflow-hidden w-[360px] h-[715px] fixed left-0 right-0 bottom-[105px] m-auto flex items-center flex justify-center z-20 rounded-[19px]">
                            {remoteTracks.map((remoteTrack) =>
                                remoteTrack.trackPublication.kind === "video" ? (
                                    <VideoComponent
                                        key={remoteTrack.trackPublication.trackSid}
                                        track={remoteTrack.trackPublication.videoTrack}
                                        participantIdentity={remoteTrack.participantIdentity}
                                        />
                                ) : (
                                    <AudioComponent
                                        key={remoteTrack.trackPublication.trackSid}
                                        track={remoteTrack.trackPublication.audioTrack}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
            
        </>
    );
}

export default TrainerChatRoom;
