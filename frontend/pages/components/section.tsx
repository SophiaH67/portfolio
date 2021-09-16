import circuitBoard from '../../styles/circuit-board.module.css'

interface Props {
  children: JSX.Element
  alt: boolean
}

export default function Section({ children, alt }: Props) {
  return <div className={(alt ? `${circuitBoard.circuitboard} bg-gray-800` : 'bg-white') + ' py-5'}>{children}</div>
}
