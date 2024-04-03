import { createEvent } from "react-event-hook";
import { Event } from "./hooks/useBakkesmod";

export const { useFeedEventListener, emitFeedEvent } = createEvent("feedEvent")<Event>();