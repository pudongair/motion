import { createMotionValueAnimation } from "."
import { Transition } from "../types"
import { motionValue, MotionValue } from "../value"
import { isMotionValue } from "../value/utils/is-motion-value"

/**
 * @public
 */
export interface AnimationPlaybackControls {
    currentTime: number | null
    stop: () => void
}

/**
 * @public
 */
export interface AnimationPlaybackLifecycles<V> {
    onUpdate?: (latest: V) => void
    onPlay?: () => void
    onComplete?: () => void
    onRepeat?: () => void
    onStop?: () => void
}

/**
 * Animate a single value or a `MotionValue`.
 *
 * The first argument is either a `MotionValue` to animate, or an initial animation value.
 *
 * The second is either a value to animate to, or an array of keyframes to animate through.
 *
 * The third argument can be either tween or spring options, and optional lifecycle methods: `onUpdate`, `onPlay`, `onComplete`, `onRepeat` and `onStop`.
 *
 * Returns `AnimationPlaybackControls`, currently just a `stop` method.
 *
 * ```javascript
 * const x = useMotionValue(0)
 *
 * useEffect(() => {
 *   const controls = animate(x, 100, {
 *     type: "spring",
 *     stiffness: 2000,
 *     onComplete: v => {}
 *   })
 *
 *   return controls.stop
 * })
 * ```
 *
 * @public
 */
export function animate<V>(
    from: MotionValue<V> | V,
    to: V | V[],
    transition: Transition & AnimationPlaybackLifecycles<V> = {}
): AnimationPlaybackControls {
    const value = isMotionValue(from) ? from : motionValue(from)
    value.start(createMotionValueAnimation("", value, to as any, transition))

    return value.animation!
}
