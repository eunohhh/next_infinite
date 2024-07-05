"use client";

import { addRealTimeOne } from "@/api/addRealTimeOne";
import supabaseClient from "@/supabase/supabaseClient";
import { RealTime } from "@/types/typs";
import { RealtimePostgresInsertPayload, User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Input from "../../_components/Input";

type RealTimePostsProps = {
    serverPosts: RealTime[];
    user: User;
};

function RealTimePosts({ serverPosts, user }: RealTimePostsProps) {
    const [realTimePosts, setRealTimePosts] = useState<RealTime[]>(serverPosts);

    const { mutate, isPending, error } = useMutation({
        mutationFn: (content: string) => addRealTimeOne(content),
        // onSuccess 는 없어도 됩니다
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const content = formData.get("content")?.toString();

        if (!content) return alert("content is required");

        mutate(content);
    };

    const handleRealTimePosts = (payload: RealtimePostgresInsertPayload<RealTime>) => {
        setRealTimePosts((prev) => [...prev, payload.new]);
    };

    useEffect(() => {
        const allChanges = supabaseClient
            .channel("realtime-posts")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "realtimeone" }, handleRealTimePosts)
            .subscribe();

        return () => {
            allChanges.unsubscribe();
        };
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Mutation Test</h1>

            <form onSubmit={handleSubmit}>
                <Input label="content" id="content" />
                <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
                    Submit
                </button>
            </form>
            <hr className="my-4" />
            <ul className="flex flex-col gap-4">
                {realTimePosts.map((post) => (
                    <li
                        className={clsx(
                            "p-4 border-2 border-gray-300 rounded-md",
                            post.created_by === user.id ? "bg-blue-500" : "bg-gray-500"
                        )}
                        key={post.id}
                    >
                        <p>{post.id}</p>
                        <p>{post.created_at}</p>
                        <p>{post.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RealTimePosts;
