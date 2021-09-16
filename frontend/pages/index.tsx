import Head from 'next/head'
import createPersistedState from 'use-persisted-state';

const useListState = createPersistedState('list');

export default function Home() {
  const [list, setList]: [number[], (list: number[])=>void] = useListState([] as number[])
  
  return (
    <div>
      <Head>
        <title>Yeah</title>
      </Head>
      <button onClick={() => setList([Math.random(), ...list])}>
        Click Me!
      </button>
      {list.map((i) => (
        <div key={i}>
          <h1>{i}</h1>
          <p>Informatie over {i}</p>
        </div>
      ))}
    </div>
  )
}
