import { configResponsive, useResponsive } from "ahooks";


configResponsive({
  small: 576,
  middle: 1024,
  large: 1600,
});


export const useMobile = () => {

  const responsive = useResponsive();

  const small = !responsive["middle"];

  return small;
}
