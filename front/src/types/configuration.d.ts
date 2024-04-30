export interface Configuration {
  uuid: string
  overlayId: number
  userId: number
  name: string
  createdAt: string
  updatedAt: string
  id: string
  active: boolean
  gameTitle: null | string
  numberOfGames: null | number
  useIngameNames: number
  teamOneName: null | string
  teamOneScore: null | string
  teamOneGoals: null | string
  teamOneImage: null | string
  teamTwoName: null | string
  teamTwoScore: null | string
  teamTwoGoals: null | string
  teamTwoImage: null | string
}

interface NewConfigurationPayload {
  overlay_id: number | undefined
}

interface UpdateConfigurationPayload {
  game_title: string
  number_of_games: number
  use_ingame_names: boolean
  team_one_name: string
  team_one_score: number
  team_one_goals: number
  team_two_name: string
  team_two_score: number
  team_two_goals: number
  team_one_image: File | null
  team_two_image: File | null
}
