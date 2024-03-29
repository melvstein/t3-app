import { SignUpButton, useUser } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  console.log(user);
  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        src={user.imageUrl}
        alt="Profile Image"
        width={50}
        height={50}
        className="rounded-full"
      />
      <input
        type="text"
        className="grow bg-transparent outline-none"
        placeholder="Type some emojis!"
      />
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div key={post.id} className="flex gap-4 border-b border-slate-400 p-4">
      <Image
        src={author.profilePicture}
        alt="Author Profile Picture"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-2">
          <span>{`@${author.username}`}</span> 
          <span className="font-thin">{`. ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

export default function Home() {
  const user = useUser();
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-200 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            {!user.isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
                <SignUpButton />
              </div>
            )}
            {user.isSignedIn && <CreatePostWizard />}
            {/* <SignOutButton /> */}
            {/* <UserButton afterSignOutUrl="/"/> */}
          </div>
          <div className="flex flex-col">
            {[...data, ...data].map((fullPost) => (
              <PostView {...fullPost} key={fullPost.post.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
