/**
 * Generates a random number based on weighted probability ranges
 *
 * @param ranges An array of ranges with their associated probabilities
 * @returns A random number from one of the ranges based on probability weights
 *
 * @example
 * // Simple usage with manual ranges
 * const result = generateRandomNumberWithWeights([
 *   { min: 0, max: 0, weight: 80 },    // 80% chance for exactly 0
 *   { min: 1, max: 25, weight: 15 },   // 15% chance for 1-25
 *   { min: 26, max: 100, weight: 5 }   // 5% chance for 26-100
 * ])
 *
 * @example
 * // Alternative usage with auto-divided range
 * const result = generateRandomNumberInRange({
 *   min: 0,
 *   max: 100,
 *   segments: [
 *     { percentage: 10, weight: 70 },  // 70% chance for first 10% of range
 *     { percentage: 40, weight: 20 },  // 20% chance for next 40% of range
 *     { percentage: 50, weight: 10 }   // 10% chance for final 50% of range
 *   ]
 * })
 */

type WeightedRange = {
    min: number
    max: number
    weight: number
}

export function generateRandomNumberWithWeights(ranges: WeightedRange[]): number {
    // Validate input
    if (ranges.length === 0) {
        throw new Error('At least one range must be provided')
    }

    // Calculate total weight
    const totalWeight = ranges.reduce((sum, range) => sum + range.weight, 0)

    // Generate random value based on weight
    const random = Math.random() * totalWeight

    // Select range based on weight
    let cumulativeWeight = 0
    for (const range of ranges) {
        cumulativeWeight += range.weight
        if (random < cumulativeWeight) {
            // Generate random number within the selected range
            return Math.floor(
                Math.random() * (range.max - range.min + 1) + range.min
            )
        }
    }

    // Fallback to the last range (shouldn't reach here if weights sum to 100)
    const lastRange = ranges[ranges.length - 1]
    if (lastRange) {
        return Math.floor(
            Math.random() * (lastRange.max - lastRange.min + 1) + lastRange.min
        )
    }
    // This ensures TypeScript knows we always return a number
    throw new Error('Unexpected: Could not find a range. This should never happen.')
}

// Optional convenience function for auto-dividing a range
type RangeSegment = {
    percentOfRange: number  // Percentage of the total range this segment covers
    weight: number      // Probability weight for this segment
}

type AutoRangeOptions = {
    min: number
    max: number
    segments: RangeSegment[]
}

export function generateRandomNumberInRange(options: AutoRangeOptions): number {
    const { min, max, segments } = options

    // Validate input
    if (segments.length === 0) {
        throw new Error('At least one segment must be provided')
    }

    const totalPercentage = segments.reduce((sum, segment) => sum + segment.percentOfRange, 0)

    if (Math.abs(totalPercentage - 100) > 0.001) {
        throw new Error('Segment percentages must sum to 100')
    }

    // Convert segments to weighted ranges
    const range = max - min
    let currentMin = min

    const weightedRanges: WeightedRange[] = segments.map(segment => {
        const segmentSize = (segment.percentOfRange / 100) * range
        const rangeMin = currentMin
        const rangeMax = Math.round(currentMin + segmentSize - 0.5)
        currentMin = rangeMax + 1

        return {
            min: rangeMin,
            max: rangeMax,
            weight: segment.weight
        }
    })

    // Ensure the last range includes the max value due to rounding
    if (weightedRanges.length > 0) {
        weightedRanges[weightedRanges.length - 1]!.max = max
    }

    return generateRandomNumberWithWeights(weightedRanges)
}
