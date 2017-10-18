import {observable, autorunAsync} from 'mobx'
import { merge } from 'lodash'

function storedObservable (key, defaultValue, debounce) {
  let fromStorage = localStorage.getItem(key)
  const defaultClone = Object.assign(defaultValue)  // we don't want to modify the given object, because userscript might want to use the original object to reset the state back to default values some time later
  if (fromStorage) {
    merge(defaultClone, JSON.parse(fromStorage))
  }
  const obsVal = observable(defaultClone)
  autorunAsync(() => {
    localStorage.setItem(key, JSON.stringify(obsVal))
    console.log(obsVal)
  }, debounce)
  return obsVal
}

export default storedObservable