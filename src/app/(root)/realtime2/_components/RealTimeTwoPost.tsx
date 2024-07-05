"use client";
import supabaseClient from "@/supabase/supabaseClient";
import { Message } from "@/types/typs";
import { RealtimeChannel, RealtimePresenceState, User } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

function RealTimeTwoPost({ user }: { user: User }) {
    const this_user = user;
    const [userState, setUserState] = useState<RealtimePresenceState>({});
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const channelRef = useRef<RealtimeChannel | null>(null); // Ensure it's mutable
    // self-sent message
    // useEffect(() => {
    //     // Join a room/topic. Can be anything except for 'realtime'.
    //     const channelA = supabaseClient.channel("room-1", {
    //         config: {
    //             broadcast: { self: true },
    //         },
    //     });

    //     // Simple function to log any messages we receive
    //     const messageReceived = (payload: Message) => console.log(payload);

    //     // Subscribe to the Channel
    //     channelA.on("broadcast", { event: "test" }, (payload: Message) => messageReceived(payload));

    //     channelA.subscribe((status) => {            // Wait for successful connection
    //         if (status !== "SUBSCRIBED") return null;

    //         // Send a message once the client is subscribed
    //         channelA.send({
    //             type: "broadcast",
    //             event: "test",
    //             payload: { message: "hello, world" },
    //         });
    //     });

    //     return () => {
    //         channelA.unsubscribe();
    //     };
    // }, []);

    const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const message = formData.get("message") as string;

        if (channelRef.current && isSubscribed) {
            const messageToSend: Message = {
                type: "broadcast",
                event: "test",
                payload: {
                    message: message,
                    id: this_user?.id,
                },
            };
            channelRef.current.send(messageToSend);

            setMessages((prevMessages) => [...prevMessages, messageToSend]);
        }
    };

    useEffect(() => {
        const channelA = supabaseClient.channel(
            "room-1"
            // {
            //     config: {
            //         broadcast: { self: true },
            //     },
            // }
        );

        channelRef.current = channelA; // Assign only if current is not null

        const messageReceived = (payload: Message) => {
            console.log(payload);
            setMessages((prevMessages) => [...prevMessages, payload]);
        };

        channelA.subscribe((status) => {
            if (status === "SUBSCRIBED") {
                setIsSubscribed(true);
            }
        });

        channelA.on("broadcast", { event: "test" }, (payload) => messageReceived(payload));

        return () => {
            channelA.unsubscribe();
        };
    }, []);

    // return <div>RealTimeTwoPost</div>;

    useEffect(() => {
        // console.log("user: ", this_user);

        const channel = supabaseClient.channel("online-users", {
            config: {
                presence: {
                    key: this_user?.email ? this_user?.email : "Unknown",
                },
            },
        });

        channel.on("presence", { event: "sync" }, () => {
            const presentState = channel.presenceState();

            // console.log("inside presence: ", presentState);

            setUserState({ ...presentState });
        });

        channel.on("presence", { event: "join" }, ({ newPresences }) => {
            console.log("New users have joined: ", newPresences);
        });

        channel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                const status = await channel.track({
                    user_name: this_user?.email ? this_user?.email : "Unknown",
                });
                // console.log("status: ", status);
            }
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    return (
        <>
            <p> 현재 로그인 중인 사람들! </p>
            {Object.keys(userState).map((key) => (
                <p className="border p-2 rounded-md" key={key}>
                    Hi ~~! {key}
                </p>
            ))}

            <div className="w-full bg-slate-200 rounded-xl">
                {messages.map((message, index) => {
                    const isMyMessage = message.payload.id === this_user?.id;
                    return (
                        <p
                            className={`transition-all duration-300 ease-in-out ${
                                isMyMessage ? "text-blue-500 text-right" : "text-red-500 text-left"
                            }`}
                            key={index}
                        >
                            {message.payload.message}
                        </p>
                    );
                })}
            </div>

            <form className="w-full flex flex-row mt-4" onSubmit={handleMessageSubmit}>
                <input className="bg-gray-200 p-2 rounded-md w-[80%]" type="text" name="message" />
                <button className="bg-blue-500 text-white p-2 rounded-md w-[20%]">누르면 메시지 전송</button>
            </form>
        </>
    );
}

export default RealTimeTwoPost;
