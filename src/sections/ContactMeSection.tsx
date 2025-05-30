import {
    animate,
    AnimatePresence,
    motion,
    useIsPresent,
    useMotionValue
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaLinkedin, FaWifi } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import CustomButton from "../components/DrawOutlineButton";
import BubbleText from "../components/BubbleText";
import VirtualKeyboard from "../components/VirtualKeyboard";
import type { Message } from "../utils/types";
import TypingIndicator from "../components/TypingIndicator"
import { BsReception4, BsBatteryFull } from "react-icons/bs";

export default function ContactMeSection() {
    const ref = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState({ width: 0, height: 0 })
    const [selectedEmails] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { sender: "system", content: "Hey! Curious what this is about?" },
        { sender: "system", content: "I trained an AI model with some of my info. Ask me anything!" },
    ]);     
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSize({
            width: ref.current?.clientWidth || 0,
            height: ref.current?.clientHeight || 0,
        })
    }, [ref])

    function useCurrentTime() {
        const [time, setTime] = useState(() => {
          const now = new Date();
          return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });
      
        useEffect(() => {
          const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }, 60000); // update every minute
      
          return () => clearInterval(interval);
        }, []);
      
        return time;
    }
    const currentTime = useCurrentTime();

    const closeModal = () => setIsDeleteModalOpen(false)     

    return (
        <div className="iphone-wrapper grid-cols-3 place-items-center">
            <div className="translate-y-[75%] h-full">
                <BubbleText text="CONTACT ME*" style="text-8xl font-bold opacity-50 tracking-tighter"/>
            </div>
            <div className="iphone-mock">
                <div className="iphone-screen font-[Open_Sans]">
                    <div className="dynamic-island"></div>
                    <div className="absolute top-5 left-0 right-0 flex justify-between items-center px-5 text-black text-sm z-50">
                        {/* Ora */}
                        <p>{currentTime}</p>

                        {/* Icone status */}
                        <div className="flex gap-2 items-center">
                            <BsReception4 className="w-4 h-4" />
                            <FaWifi className="w-4 h-4" />
                            <BsBatteryFull className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="w-full h-full bg-white rounded-[40px] overflow-hidden">

                        {/* Full screen chat body with header */}
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="bg-gray-100/50 px-4 py-2 pt-14 flex items-center gap-2">
                                <div className="w-8 h-8 bg-[url(/luigi.jpeg)] bg-cover rounded-full" />
                                <h1 className="font-semibold text-black">Luigi Di Loreto</h1>
                            </div>

                            <div className="flex-1 overflow-y-auto flex flex-col gap-2 px-3 py-4 bg-[#e5ddd5] text-sm text-black">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`rounded-xl px-3 py-2 max-w-[80%] shadow ${msg.sender === "user" ? "self-end bg-[#dcf8c6]" : "self-start bg-white"}`}
                                    >
                                        {msg.content}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="p-2 bg-gray-100 rounded-lg w-fit">
                                        <TypingIndicator />
                                    </div>
                                )}
                            </div>
                            <VirtualKeyboard messages={messages!} setMessages={setMessages} isLoading={isLoading} setIsLoading={setIsLoading}/>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isDeleteModalOpen ? (
                            <ImmersiveOverlay
                                close={closeModal}
                                itemCount={selectedEmails.length}
                                size={size}
                            />
                        ) : null}
                    </AnimatePresence>

                    <div className="iphone-home-indicator"></div>
                </div>
            </div>
            <motion.div 
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <h1 className="text-2xl font-bold ml-1">Wanna reach out?</h1>
                <h1 className="text-7xl font-bold">FIND ME HERE</h1>
                <div className="flex gap-4">
                    <a
                        href="https://www.linkedin.com/in/luigi-di-loreto-023361173/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <CustomButton text="" sx="p-0!" child={<FaLinkedin size={30} />} />
                    </a>
                    <a href="mailto:luigi.dl@hotmail.it">
                        <CustomButton text="" child={<IoMailOutline size={30}/>} />
                    </a>
                    <a
                        href="https://www.instagram.com/luigidiloreto/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <CustomButton text="" child={<FaInstagram size={30}/>}/>
                    </a>
                </div>
            </motion.div>
            <StyleSheet />
        </div>
    )
}

function GradientOverlay({
    size,
}: {
    size: { width: number; height: number }
}) {
    const breathe = useMotionValue(0)
    const isPresent = useIsPresent()

    useEffect(() => {
        if (!isPresent) {
            animate(breathe, 0, { duration: 0.5, ease: "easeInOut" })
        }

        async function playBreathingAnimation() {
            await animate(breathe, 1, {
                duration: 0.5,
                delay: 0.35,
                ease: [0, 0.55, 0.45, 1],
            })

            animate(breathe, [null, 0.7, 1], {
                duration: 15,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
            })
        }

        playBreathingAnimation()
    }, [breathe, isPresent])

    const enterDuration = 0.75
    const exitDuration = 0.5

    const expandingCircleRadius = size.width / 3

    return (
        <div className="gradient-container">
            <motion.div
                className="expanding-circle"
                initial={{
                    scale: 0,
                    opacity: 1,
                    backgroundColor: "rgb(233, 167, 160)",
                }}
                animate={{
                    scale: 10,
                    opacity: 0.2,
                    backgroundColor: "rgb(246, 63, 42)",
                    transition: {
                        duration: enterDuration,
                        opacity: { duration: enterDuration, ease: "easeInOut" },
                    },
                }}
                exit={{
                    scale: 0,
                    opacity: 1,
                    backgroundColor: "rgb(233, 167, 160)",
                    transition: { duration: exitDuration },
                }}
                style={{
                    left: `calc(50% - ${expandingCircleRadius / 2}px)`,
                    top: "100%",
                    width: expandingCircleRadius,
                    height: expandingCircleRadius,
                    originX: 0.5,
                    originY: 1,
                }}
            />

            <motion.div
                className="gradient-circle top-left"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.9,
                    transition: { duration: enterDuration },
                }}
                exit={{
                    opacity: 0,
                    transition: { duration: exitDuration },
                }}
                style={{
                    scale: breathe,
                    width: size.width * 2,
                    height: size.width * 2,
                    top: -size.width,
                    left: -size.width,
                }}
            />

            <motion.div
                className="gradient-circle bottom-right"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.9,
                    transition: { duration: enterDuration },
                }}
                exit={{
                    opacity: 0,
                    transition: { duration: exitDuration },
                }}
                style={{
                    scale: breathe,
                    width: size.width * 2,
                    height: size.width * 2,
                    top: size.height - size.width,
                    left: 0,
                }}
            />
        </div>
    )
}

function ImmersiveOverlay({
    close,
    itemCount,
    size,
}: {
    close: () => void
    itemCount: number
    size: { width: number; height: number }
}) {
    const transition = {
        duration: 0.35,
        ease: [0.59, 0, 0.35, 1],
    }

    const enteringState = {
        rotateX: 0,
        skewY: 0,
        scaleY: 1,
        scaleX: 1,
        y: 0,
        transition: {
            ...transition,
            y: { type: "spring", visualDuration: 0.7, bounce: 0.2 },
        },
    }

    const exitingState = {
        rotateX: -5,
        skewY: -1.5,
        scaleY: 2,
        scaleX: 0.4,
        y: 100,
    }

    return (
        <div className="overlay-root" onClick={close}>
            <GradientOverlay size={size} />
            <motion.div
                className="overlay-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
            >
                <motion.div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                    initial={exitingState}
                    animate={enteringState}
                    exit={exitingState}
                    transition={transition}
                    style={{
                        transformPerspective: 1000,
                        originX: 0.5,
                        originY: 0,
                    }}
                >
                    <header>
                        <h2 className="h3">
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                        </h2>
                        <p className="big">
                            Are you sure you want to delete these entries? You
                            can&apos;t undo this action.
                        </p>
                    </header>
                    <div className="controls">
                        <button onClick={close} className="delete">
                            Delete
                        </button>
                        <button onClick={close} className="cancel">
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>{`
        body {
            overflow: hidden;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }

        .iphone-wrapper {
            display: grid;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
            padding: 20px;
            box-sizing: border-box;
        }

        .iphone-mock {
            position: relative;
            width: 375px;
            height: 760px;
            background-color: #1a1a1a;
            border-radius: 50px;
            box-shadow: 0 0 0 14px #121212, 0 0 0 17px #232323, 0 20px 40px rgba(0, 0, 0, 0.8);
            padding: 0;
            box-sizing: border-box;
            overflow: hidden;
        }

        @media (max-height: 900px) {
            .iphone-mock {
                width: 375px;
                height: 760px;
            }
        }

        @media (max-height: 700px) {
            .iphone-wrapper {
               padding: 0;
             }

            .iphone-mock {
                width: 100%;
                height: 100%;
                background-color: transparent;
                border-radius: 0;
                padding-top: 50px;
                box-shadow: none;
            }

            .dynamic-island {
                display: none;
            }

            .iphone-status-bar {
                display: none !important;
            }

            .iphone-home-indicator {
                display: none;
            }

            .iphone-screen {
                border-radius: 0;
            }
        }

        .iphone-screen {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #0b1011;
            border-radius: 38px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .dynamic-island {
            position: absolute;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 34px;
            background-color: #000;
            border-radius: 20px;
            z-index: 2000;
        }

        .iphone-status-bar {
            height: 60px;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            color: white;
            font-weight: 600;
            font-size: 14px;
            padding-top: 15px;
        }

        .iphone-home-indicator {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 134px;
            height: 5px;
            background-color: white;
            opacity: 0.2;
            border-radius: 3px;
            z-index: 2000;
        }

        .app-content {
            flex: 1;
            padding: 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-top: 10px;
        }

        .email-app-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            background-color: #0b1011;
            color: #f5f5f5;
            border: none;
            border-radius: 0;
            overflow: hidden;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 26px 20px 16px;
            border-bottom: 1px solid #1d2628;
        }

        .header h1 {
            font-size: 24px;
            margin: 0;
        }

        .delete-button {
            background-color: #fff4;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .delete-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background-color: #fff0;
        }

        .email-list {
            flex: 1;
            overflow-y: auto;
            padding: 0;
        }

        .email-item {
            display: flex;
            padding: 16px 20px;
            border-bottom: 1px solid #1d2628;
            align-items: center;
            display: flex;
            gap: 16px;
        }

        .checkbox {
            width: 20px;
            height: 20px;
        }

        .email-content {
            flex: 1;
        }

        .email-content h3 {
            margin: 0 0 8px 0;
            font-size: 16px;
        }

        .email-content p {
            margin: 0;
            font-size: 14px;
            opacity: 0.7;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .overlay-root {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }

        .overlay-content {
            background: rgb(246, 63, 42, 0.2);
            backdrop-filter: blur(3px);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            will-change: opacity;
        }

        .modal-content {
            width: 75%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            will-change: transform;
        }

        .modal-content p {
            color: #f5f5f5;
        }

        .modal-content header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }

        .controls {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }

        button.delete {
            background-color: #f5f5f5;
            color: #0f1115;
            border-radius: 20px;
            padding: 10px 20px;
        }

        .gradient-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1001;
        }

        .expanding-circle {
            position: absolute;
            border-radius: 50%;
            background:  rgb(251, 148, 137,0.8);
            filter: blur(15px);
            transform-origin: center;
            will-change: transform;
        }

        .gradient-circle {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            width: 200%;
            aspect-ratio: 1;
            will-change: transform;
        }

        .top-left {
            background: rgb(246, 63, 42, 0.9);
        }

        .bottom-right {
            background: rgb(243, 92, 76, 0.9);
        }
    `}</style>
    )
}