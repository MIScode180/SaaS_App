"use client";

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwave from "@/constants/soundwaves.json";
import {addActiveHistory} from "@/lib/actions/library.actions";


 enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
  }

export default function LibraryComponent({
  libraryId,
  userName,
  userImage,
  subject,
  topic,
  name,
  style,
  voice,
}: LibraryComponentProps) {
 

  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onActive = () => setCallStatus(CallStatus.ACTIVE);

    const onFinished = () => {
        console.log("call-end fired");
      setCallStatus(CallStatus.FINISHED);
      addActiveHistory(libraryId);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      }
    };
    const onSpeaking = () => setIsSpeaking(true);

    const onSpeakingEnd = () => setIsSpeaking(false);

    const onError = () => console.log("Error occurred during the call");

    vapi.on("call-start", onActive);
    vapi.on("call-end", onFinished);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeaking);
    vapi.on("speech-end", onSpeakingEnd);

    return () => {
      vapi.off("call-start", onActive);
      vapi.off("call-end", onFinished);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeaking);
      vapi.off("speech-end", onSpeakingEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const sessionConnected = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style },

      clientMessages: ["transcript"],
      serverMessages: [],
    };
    
    // @ts-ignore
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const sessionDisconnected = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };
  return (
    <>
      <section className="flex flex-col gap-6 h-17.5">
        <section className="flex  gap-8 max-sm:flex-col">
          <div className="library-section">
            <div
              className="library-avatar"
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.FINISHED ||
                    callStatus === CallStatus.INACTIVE
                    ? "opacity-100"
                    : "opacity-0",
                  callStatus === CallStatus.CONNECTING &&
                    "opacity-100 animate-pulse",
                )}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={120}
                  height={120}
                  className="max-sm:w-fit"
                />
              </div>
              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.ACTIVE
                    ? "opacity-100"
                    : "opacity-0",
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwave}
                  autoplay={false}
                  className="library-lottie"
                />
              </div>
            </div>
            <p className="text-lg font-semibold">{name}</p>
          </div>
          <div className="user-section">
            <div className="user-avatar">
              <Image
                src={userImage}
                alt={userName}
                width={120}
                height={120}
                className="rounded-2xl object-cover"
              />
              <p className="text-2xl font-bold">{userName}</p>
            </div>
            <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
              <Image
                src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                alt="mic"
                width={24}
                height={24}
              />
              <p className="max-sm:hidden"  >
                {isMuted ? "Turn On Mic" : "Turn off"}
              </p>
            </button>
            <button
              className={cn(
                "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
                callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
                callStatus === CallStatus.CONNECTING && "animated-pulse",
              )}
              onClick={
                callStatus === CallStatus.ACTIVE
                  ? sessionDisconnected
                  : sessionConnected
              }
            >
              {callStatus === CallStatus.ACTIVE
                ? "End Call"
                : callStatus === CallStatus.CONNECTING
                  ? "Connecting..."
                  : "Start Session"}
            </button>
          </div>
        </section>
        <section className="transcript">
          <div className="transcript-message no-scrollbar text-black">
            {messages.map((message , index) => {
              if (message.role === "assistant") {
                return <p key={index} className="max-sm text-sm">
                  {name.
                  split((" " )[0]
                  .replace(/[^a-zA-Z]/g, ""))}
                  : {message.content}
                </p>;
              }else {
                return <p key={index} className="max-sm text-sm">
                  {userName}: {message.content}
                </p>;
              }
            })}
          </div>
          <div className="transcript-fade" /> 
        </section>
      </section>
    </>
  );
}
