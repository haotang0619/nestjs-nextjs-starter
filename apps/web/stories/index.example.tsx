export const Test = ({ children }) => <>Test: {children}</>;

export default function Example() {
  return <Test>{'Hello world!'}</Test>;
}
