import { useEffect, useState } from "react"
import { emitFeedEvent } from "../events";
import { Ball, Goal, Player, Team } from "../types/BakkesmodType";


export function useBakkesmod() {

      const [teamA, setTeamA] = useState<Team>({ name: '', players: [], score: 0 })
      const [teamB, setTeamB] = useState<Team>({ name: '', players: [], score: 0 })
      const [selectedPlayer, setSelectedPlayer] = useState({ player: {} })

      const [game, setGame] = useState({ id: '', stadium: '', isOver: false, isPodium: false })

      const [ball, setBall] = useState<Ball>({ location: { X: 0, Y: 0, Z: 0 }, speed: 0, team: -1 })
      const [goal, setGoal] = useState<Goal>({ assister: { id: '', name: '' }, scorer: { id: '', name: '', teamnum: -1 }, speed: 0 })
      const [replayMode, setReplayMode] = useState<boolean>(false)

      const handleMatchCreated = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handleInitialized = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handlePreCountdownBegin = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handlePostCountdownBegin = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handleRoundStartedGo = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handleClockStarted = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handleClockUpdatedSeconds = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handleClockStopped = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handleUpdateState = (jEvent: { data: any }) => {
            const { data } = jEvent;
            const teams: { name: string; score: number }[] = data.game.teams;

            console.log(jEvent.data)

            setGame(prev => ({ ...prev, stadium: data.game.arena, id: data.match_guid }))

            // handling team update
            const players: Player[] = Object.values(data.players) as Player[]
            setTeamA(prev => ({
                  ...prev,
                  name: teams[0].name,
                  score: teams[0].score,
                  players: players.filter((player: Player) => player.team === 0)
            }))

            setTeamB(prev => ({
                  ...prev,
                  name: teams[1].name,
                  score: teams[1].score,
                  players: players.filter((player: Player) => player.team === 1)
            }))

            //handling ball update
            setBall(data.game.ball)
      };

      const handleBallHit = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handleStatfeedEvent = (jEvent: { data: Event; }) => {
            emitFeedEvent(jEvent.data)
      };

      const handleGoalScored = (jEvent) => {
            const { data } = jEvent

            setGoal(() => ({
                  assister: data.assister,
                  scorer: data.scorer,
                  speed: data.goalspeed,
            }))
      };

      const handleReplayStart = () => {
            setReplayMode(() => true)
      };

      const handleReplayWillEnd = (jEvent) => {
            // console.log(jEvent.data)
      };

      const handleReplayEnd = () => {
            setReplayMode(() => false)
      };

      const handleMatchEnded = (jEvent) => {
            setGame(prev => ({ ...prev, isOver: true }))
      };

      const handlePodiumStart = (jEvent) => {
            setGame(prev => ({ ...prev, isPodium: true }))
      };

      const handleMatchDestroyed = (jEvent) => {
            // console.log(jEvent.data)
      };


      useEffect(() => {
            const ws = new WebSocket('ws://localhost:49122')

            ws.onopen = () => {
                  console.log('Connection open')
            }

            ws.onerror = (error) => {
                  console.log(`WebSocket error:`)
                  console.log(error)
            }

            ws.onmessage = (e) => {
                  const jEvent = JSON.parse(e.data)

                  switch (jEvent.event) {
                        case 'sos:version':
                              console.log(`SOS Plugin version : ${jEvent.data}`)
                              break
                        case 'game:match_created':
                              handleMatchCreated(jEvent)
                              break
                        case 'game:initialized':
                              handleInitialized(jEvent)
                              break
                        case 'game:pre_countdown_begin':
                              handlePreCountdownBegin(jEvent)
                              break
                        case 'game:post_countdown_begin':
                              handlePostCountdownBegin(jEvent)
                              break
                        case 'game:round_started_go':
                              handleRoundStartedGo(jEvent)
                              break
                        case 'game:clock_started':
                              handleClockStarted(jEvent)
                              break
                        case 'game:clock_updated_seconds':
                              handleClockUpdatedSeconds(jEvent)
                              break
                        case 'game:clock_stopped':
                              handleClockStarted(jEvent)
                              break
                        case 'game:update_state':
                              handleUpdateState(jEvent)
                              break
                        case 'game:ball_hit':
                              handleBallHit(jEvent)
                              break
                        case 'game:statfeed_event':
                              handleStatfeedEvent(jEvent)
                              break
                        case 'game:goal_scored':
                              handleGoalScored(jEvent)
                              break
                        case 'game:replay_start':
                              handleReplayStart()
                              break
                        case 'game:replay_will_end':
                              handleReplayWillEnd(jEvent)
                              break
                        case 'game:replay_end':
                              handleReplayEnd()
                              break
                        case 'game:match_ended':
                              handleMatchEnded(jEvent)
                              break
                        case 'game:podium_start':
                              handlePodiumStart(jEvent)
                              break
                        case 'game:match_destroyed':
                              handleMatchDestroyed(jEvent)
                              break
                        default:
                              console.error('no event', jEvent.event)
                              break
                  }
            }
            return () => {
                  ws.close()
            }
      }, [])

      return { teamA, teamB, game, ball, replayMode };
}