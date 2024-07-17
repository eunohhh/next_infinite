"use client";

import supabaseClient from "@/supabase/supabaseClient";
import { Tables } from "@/types/supabase";
import { useRef, useState } from "react";
import Peer, { SignalData } from "simple-peer";

type Signal = Tables<"signals"> & { signal: string | SignalData };

interface RealtimePayload<T> {
    new: T;
    old: T | null;
}

function VoiceChat() {
    const localAudioRef = useRef<HTMLAudioElement>(null);
    const remoteAudioRef = useRef<HTMLAudioElement>(null);
    const peerRef = useRef<Peer.Instance | null>(null);
    const peer2Ref = useRef<Peer.Instance | null>(null);
    const [permissionDenied, setPermissionDenied] = useState(false);

    const sendSignal = async (signal: { sdp: string; type: string }) => {
        const { error } = await supabaseClient.from("signals").insert([{ signal }]);
        if (error) {
            console.error("Error sending signal:", error);
        }
    };

    const startVoiceChat = async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

                if (localAudioRef.current) {
                    localAudioRef.current.srcObject = stream;
                }

                // Create peer connection
                const peer = new Peer({
                    initiator: true,
                    trickle: false,
                    stream: stream,
                });

                const peer2 = new Peer();

                peer.on("error", (err) => console.log("error", err));

                peer.on("signal", (data) => {
                    // Send signal data to other peers via Supabase Realtime
                    peer2.signal(data);
                    // sendSignal(data);
                });

                peer2.on("signal", (data) => {
                    // Send signal data to other peers via Supabase Realtime
                    peer.signal(data);
                    // sendSignal(data);
                });

                peer2.on("stream", (stream) => {
                    if (remoteAudioRef.current) {
                        if ("srcObject" in remoteAudioRef.current) {
                            remoteAudioRef.current.srcObject = stream;
                        }

                        if ("src" in remoteAudioRef.current) {
                            remoteAudioRef.current.src = window.URL.createObjectURL(
                                new Blob([stream as any], { type: "audio/ogg" })
                            ); // for older browsers
                        }
                    }
                });

                peerRef.current = peer;
                peer2Ref.current = peer2;
                // setPermissionDenied(false); // Reset permission denied state
            } else {
                alert("Your browser does not support getUserMedia API");
            }
        } catch (error: any) {
            console.error("Error accessing media devices.", error);
            if (error.name === "NotAllowedError") {
                // setPermissionDenied(true); // Set permission denied state
            } else {
                alert("Error accessing media devices: " + error.message);
            }
        }
    };
    // return () => {
    //     // supabaseClient.removeChannel(subscription);
    // };
    // }, []);

    return (
        <div>
            <button onClick={startVoiceChat}>Start Voice Chat</button>
            <audio ref={localAudioRef} autoPlay muted />
            <audio ref={remoteAudioRef} autoPlay />
        </div>
    );
}

export default VoiceChat;

// useEffect(() => {
//     const getUserMedia = async () => {
//         try {
//             if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

//                 if (localVideoRef.current) {
//                     localVideoRef.current.srcObject = stream;
//                 }

//                 // Create peer connection
//                 const peer = new Peer({
//                     initiator: true,
//                     trickle: false,
//                     stream: stream,
//                 });

//                 const peer2 = new Peer();

//                 peer.on("error", (err) => console.log("error", err));

//                 peer.on("signal", (data) => {
//                     // Send signal data to other peers via Supabase Realtime
//                     peer2.signal(data);
//                     // sendSignal(data);
//                 });

//                 peer2.on("signal", (data) => {
//                     // Send signal data to other peers via Supabase Realtime
//                     peer.signal(data);
//                     // sendSignal(data);
//                 });

//                 peer2.on("stream", (stream) => {
//                     if (remoteVideoRef.current) {
//                         if ("srcObject" in remoteVideoRef.current) {
//                             remoteVideoRef.current.srcObject = stream;
//                         }
//                         if ("src" in remoteVideoRef.current) {
//                             remoteVideoRef.current.src = window.URL.createObjectURL(
//                                 new Blob([stream as any], { type: "audio/ogg" })
//                             ); // for older browsers
//                         }
//                     }
//                 });
//                 peerRef.current = peer;
//             } else {
//                 alert("Your browser does not support getUserMedia API");
//             }
//         } catch (error: any) {
//             console.error("Error accessing media devices.", error);
//             if (error.name === "NotAllowedError") {
//                 alert("Permission denied: Please allow access to your microphone.");
//             } else {
//                 alert("Error accessing media devices: " + error.message);
//             }
//         }
//     };
//     return () => {
//         // supabaseClient.removeChannel(subscription);
//     };
// }, []);
