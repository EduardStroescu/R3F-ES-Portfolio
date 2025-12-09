import { useShallow } from "zustand/react/shallow";
import { useContactStore } from "../lib/stores/useContactStore";
import { a, useTransition } from "@react-spring/web";
import { FailIcon, SuccessIcon } from "./Icons";

export default function NotificationSection() {
  const { messageSent, messageReceived } = useContactStore(
    useShallow((state) => ({
      flipped: state.flipped,
      messageSent: state.messageSent,
      messageReceived: state.messageReceived,
    }))
  );

  const notificationTransition = useTransition(messageSent, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 50 },
    leave: { opacity: 0, height: 0 },
    config: { mass: 10, tension: 500, friction: 100 },
  });
  return (
    <div className="fixed bottom-0 right-0 p-4 pointer-events-auto">
      {notificationTransition(
        (styles, item) =>
          item && (
            <a.div style={styles}>
              <div
                className="p-2 bg-[#220140] items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex"
                role="alert"
              >
                <span className="flex rounded-full bg-[#410578] uppercase px-2 py-1 text-xs font-bold mr-3">
                  {messageReceived ? <SuccessIcon /> : <FailIcon />}
                </span>
                <span className="font-semibold mr-2 text-left flex-auto">
                  {messageReceived
                    ? "Message Sent"
                    : "Failed: Please try again later"}
                </span>
              </div>
            </a.div>
          )
      )}
    </div>
  );
}
