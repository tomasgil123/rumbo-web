import { Variants } from 'framer-motion'
interface VariantsInput {
  percents: number[]
  duration: number
  delay: number
  radius: number
}

type VariantProgressCircle = {
  variant: Variants
  fillPercents: number
}

export const generateVariants = ({
  percents,
  duration,
  delay,
  radius,
}: VariantsInput): VariantProgressCircle[] => {
  const variants: VariantProgressCircle[] = []

  percents.forEach((percent) => {
    const circumference = Math.ceil(2 * Math.PI * radius)
    const fillPercents = Math.abs(Math.ceil((circumference / 100) * (percent - 100)))
    const transition = {
      duration: duration,
      delay: delay,
      ease: 'easeIn',
    }

    const variant = {
      hidden: {
        strokeDashoffset: circumference,
        transition,
      },
      show: {
        strokeDashoffset: fillPercents,
        transition,
      },
    }
    variants.push({ variant: variant, fillPercents: fillPercents })
  })

  return variants
}
