"use client";

import supabaseClient from "@/supabase/supabaseClient";
import { Tables } from "@/types/supabase";
import { useEffect, useRef } from "react";
import Peer, { SignalData } from "simple-peer";

type Signal = Tables<"signals"> & { signal: string | SignalData };

interface RealtimePayload<T> {
    new: T;
    old: T | null;
}

const VoiceChat = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<Peer.Instance | null>(null);

    const sendSignal = async (signal: { sdp: string; type: string }) => {
        const { error } = await supabaseClient.from("signals").insert([{ signal }]);
        if (error) {
            console.error("Error sending signal:", error);
        }
    };

    useEffect(() => {
        // Listen for signals from other peers
        // const handleSignal = (data: string) => {
        //     if (peerRef.current) {
        //         peerRef.current.signal(data);
        //     }
        // };

        // // Subscribe to Supabase Realtime for incoming signals
        // const subscription = supabaseClient
        //     .channel("signals")
        //     .on(
        //         "postgres_changes",
        //         { event: "INSERT", schema: "public", table: "signals" },
        //         (payload: RealtimePostgresInsertPayload<Signal>) =>
        //             handleSignal(payload.new.signal as string)
        //     )
        //     .subscribe();
        // Get local stream
        const getUserMedia = async () => {
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = stream;
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
                        if (remoteVideoRef.current) {
                            if ("srcObject" in remoteVideoRef.current) {
                                remoteVideoRef.current.srcObject = stream;
                            }
                            if ("src" in remoteVideoRef.current) {
                                remoteVideoRef.current.src = window.URL.createObjectURL(
                                    new Blob([stream as any], { type: "audio/ogg" })
                                ); // for older browsers
                            }
                        }
                    });
                    peerRef.current = peer;
                } else {
                    alert("Your browser does not support getUserMedia API");
                }
            } catch (error: any) {
                console.error("Error accessing media devices.", error);
                if (error.name === "NotAllowedError") {
                    alert("Permission denied: Please allow access to your microphone.");
                } else {
                    alert("Error accessing media devices: " + error.message);
                }
            }

            // }
            // navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
            //     if (localVideoRef.current) {
            //         localVideoRef.current.srcObject = stream;
            //     }

            //     // Create peer connection
            //     const peer = new Peer({
            //         initiator: true,
            //         trickle: false,
            //         stream: stream,
            //     });

            //     const peer2 = new Peer();

            //     peer.on("error", (err) => console.log("error", err));

            //     peer.on("signal", (data) => {
            //         // Send signal data to other peers via Supabase Realtime
            //         peer2.signal(data);
            //         // sendSignal(data);
            //     });

            //     peer2.on("signal", (data) => {
            //         // Send signal data to other peers via Supabase Realtime
            //         peer.signal(data);
            //         // sendSignal(data);
            //     });

            //     peer2.on("stream", (stream) => {
            //         if (remoteVideoRef.current) {
            //             if ("srcObject" in remoteVideoRef.current) {
            //                 remoteVideoRef.current.srcObject = stream;
            //             }
            //             if ("src" in remoteVideoRef.current) {
            //                 remoteVideoRef.current.src = window.URL.createObjectURL(
            //                     new Blob([stream as any], { type: "audio/ogg" })
            //                 ); // for older browsers
            //             }
            //         }
            //     });
            //     peerRef.current = peer;
            // });
        };
        return () => {
            // supabaseClient.removeChannel(subscription);
        };
    }, []);

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted />
            <video ref={remoteVideoRef} autoPlay />
        </div>
    );
};

export default VoiceChat;
