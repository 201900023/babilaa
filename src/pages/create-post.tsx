import Image from "next/image"
import Layout from "@/components/layouts/main-layout"
import { Dialog } from "@headlessui/react"
import { useState } from "react"
import { FaImages } from "react-icons/fa"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from 'react-toastify';
import PostContent from "@/components/post-input/post-content"
import usePostInput from "@/components/post-input/use-post-input"
import PostFileInput from "@/components/post-input/post-file-input"
const CreatePost = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const { data: session } = useSession();
    const me = session?.user!;

    const addPostCallback = () => {
        toast('Your post was added successfully', {
            type: 'success',
        });
        router.push('/')
    };

    const {
        handleFormSubmit,
        getRootProps,
        isImageDragged,
        register,
        setValue,
        control,
        openFilePicker,
        finalUploadProgress,
        isSubmitButtonEnabled,
        errors,
        content,
        getInputProps,
        isUploading,
    } = usePostInput({ submitCallback: addPostCallback });

    return (
        <Layout>
            <h1 className="text-xl text-white bg-purple-0 text-center py-2 ">Create New Post</h1>
            <form onSubmit={handleFormSubmit}>
                <div className='bg-white w-[95vw] mx-auto rounded-md grid p-3' >
                    <header className="flex gap-2 border-b border-gray-100">

                        <div>
                            <Image
                                src={me.image || '/images/avatar-fallback.svg'}
                                width="40"
                                height="40"
                                layout="fixed"
                                alt=""
                                className="rounded-full"
                                objectFit="cover"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold text-purple-0">{me.name}</h3>
                            <h3 className="text-sm  text-purple-0 ">@{me.id}</h3>

                        </div>

                    </header>

                    <main className="mt-2">

                        <PostContent
                            content={content}
                            register={register}
                            disabled={isUploading}
                        />


                        {finalUploadProgress !== 0 && (
                            <div className="w-full h-1 rounded-sm overflow-hidden my-2">
                                <div
                                    className="bg-blue-500 w-full h-full"
                                    style={{
                                        transform: `translateX(-${100 - finalUploadProgress}%)`,
                                    }}
                                />
                            </div>
                        )}

                        <PostFileInput
                            openFilePicker={openFilePicker}
                            control={control}
                            setValue={setValue}
                            disabled={isUploading}
                        />

                        <input {...getInputProps()} />



                        <div className="grid grid-cols-2 gap-5  px-3 py-2 rounded-full mb-2">
                            <label htmlFor="visiblity" className=" font-bold">Visiblity</label>
                            <select id="visiblity" name="visiblity" className=" bg-transparent"  >
                                <option className="capitalize" value="everyone">everyone</option>
                                <option className="capitalize" value="only me">only me</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-5  px-3 py-2 rounded-full mb-2">
                            <label htmlFor="post-on" className=" font-bold">Post in </label>
                            <select id="post-on" name="post-on" className=" bg-transparent"  >
                                {['My Profile', 'FCB', 'Chinese Community', 'Ramen lovers', 'gadjets', 'sport', 'entertaiment'].map((opt) => <option className="capitalize" value={opt}>{opt}</option>)}
                            </select>
                        </div>


                    </main>
                    <footer className="grid grid-cols-2 gap-5 mt-5">
                        <button
                            type="submit"
                            onClick={() => {
                                router.push('/')
                            }}
                            className="w-full font-bold bg-none text-gray-500 rounded-full p-1.5"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isSubmitButtonEnabled}
                            className="w-full font-bold bg-purple-0 text-white rounded-full p-1.5"
                        >
                            Share
                        </button>


                    </footer>

                </div>
            </form>


        </Layout>
    )
}
export default CreatePost

import { type GetServerSidePropsContext } from "next"
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import userRouter from "@/server/router/user"



export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
}

