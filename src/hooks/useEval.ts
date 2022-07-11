const useEval = ( fn:string ) => {
  const Fn = Function;
  return new Fn('return ' + fn)();
}

export default useEval