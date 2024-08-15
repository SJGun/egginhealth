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
import { Alert } from "../../api/RTC.js";
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
      // 알림보내기
      try {
        await Alert(trainerId, roomName);
      } catch (error) {
        console.error("상대 알림 OFF:", error.message);
        // 오류가 발생하더라도 프로그램이 계속 진행되도록 예외를 무시합니다.
      }

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
                <form className="fixed bottom-[76px] bg-white flex w-[70px] h-[50px] items-center justify-center pr-[5px]"
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
                <ChatComponent participantName={trainerId} roomName={roomName} receiver={roomName} />
            </div>
             </div>   
            ): (
              <div
              id="room"
              className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-between"
            >
              <div id="layout-container" className="relative w-full flex-1 flex flex-col items-center justify-center">
                <div className="overflow-hidden w-[133px] h-[133px] absolute bottom-[105px] flex items-center justify-center z-40 rounded-[19px] mr-[230px]">
                  {localTrack && (
                    <VideoComponent
                      track={localTrack}
                      participantIdentity={participantName}
                      local={true}
                    />
                  )}
                </div>
                <div className="overflow-hidden w-full h-full absolute bottom-[105px] flex items-center justify-center z-30 rounded-[19px]">
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
              <div id="room-header" className="w-full">
                <button
                  className="btn-danger bg-white w-full fixed bottom-0 left-0 right-0 flex items-center justify-center z-60 p-4"
                  id="leave-room-button"
                  onClick={leaveRoom}
                >
                  <img src={LeaveRoom} alt="Leave Room" />
                </button>
              </div>
            </div>
            )}
            
        </>
    );
}

export default TrainerChatRoom;
