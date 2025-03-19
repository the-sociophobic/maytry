import { StateType } from './state'
import { useStore as _useStore } from './StoreProvider'


const useStore = () => _useStore<StateType>(state => state)


export default useStore
