import { action, observable } from "mobx"
import { useStaticRendering } from "mobx-react"
import RoomList from "../models/RoomList"
import { defaultRoomData } from "../data/defaultRoomData"
import RoomsApi from "../api/RoomsApi"
import { toast } from "react-toastify"

const isServer = typeof window === "undefined"
useStaticRendering(isServer)

export default class RoomsStore {
  @observable
  public roomData: RoomList[] = defaultRoomData
  @observable
  public loading: boolean = false

  hydrate(serializedStore: RoomsStore) {
    this.roomData =
      serializedStore.roomData !== defaultRoomData
        ? serializedStore.roomData
        : defaultRoomData
  }

  @action
  public updateRoomData = (data: RoomList[]) => {
    this.roomData = data
  }

  @action
  public submitRoomData = async () => {
    this.loading = true
    try {
      await RoomsApi.setRoomData(this.roomData)
      toast.info("Successfully submitted your data!")
    } catch (err) {
      toast.error(
        "There was a problem setting your room data. Please try again."
      )
    } finally {
      this.loading = false
    }
  }
}
