import YMap from '../YMap.js'
import { getHook, addHook } from './hooks.js'

export default class YXmlHook extends YMap {
  constructor (hookName, dom) {
    super()
    this._dom = null
    this.hookName = null
    if (hookName !== undefined) {
      this.hookName = hookName
      this._dom = dom
      dom._yjsHook = hookName
      dom._yxml = this
      getHook(hookName).fillType(dom, this)
    }
  }
  _copy () {
    const struct = super._copy()
    struct.hookName = this.hookName
    return struct
  }
  getDom (_document) {
    _document = _document || document
    if (this._dom === null) {
      const dom = getHook(this.hookName).createDom(this)
      this._dom = dom
      dom._yxml = this
      dom._yjsHook = this.hookName
    }
    return this._dom
  }
  _unbindFromDom () {
    this._dom._yxml = null
    this._yxml = null
    // TODO: cleanup hook?
  }
  _fromBinary (y, decoder) {
    const missing = super._fromBinary(y, decoder)
    this.hookName = decoder.readVarString()
    return missing
  }
  _toBinary (encoder) {
    super._toBinary(encoder)
    encoder.writeVarString(this.hookName)
  }
  _integrate (y) {
    if (this.hookName === null) {
      throw new Error('hookName must be defined!')
    }
    super._integrate(y)
  }
  setDomFilter () {
    // TODO: implement new modfilter method!
  }
  enableSmartScrolling () {
    // TODO: implement new smartscrolling method!
  }
}
YXmlHook.addHook = addHook
