type Props = {
  readonly class?: string | undefined;
  readonly width?: string | undefined;
  readonly height?: string | undefined;
};

export function PlaceholderAdd(props: Props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class={props.class}
        // width={props.width || "42px"}
        // height={props.height || "42px"}
        viewBox="0 0 42 42"
        fill="none"
      >
        <rect
          x="0.5"
          y="0.5"
          width="41"
          height="41"
          rx="8"
          stroke="var(--md-sys-color-on-background)"
          stroke-dasharray="2 2"
        />
        <path
          d="M13.6463 30C13.1936 30 12.806 29.8388 12.4836 29.5164C12.1612 29.194 12 28.8064 12 28.3537V14.7439C12 14.2912 12.1612 13.9036 12.4836 13.5812C12.806 13.2588 13.1936 13.0976 13.6463 13.0976H22.6463V13.8659H13.6463C13.3902 13.8659 13.1799 13.9482 13.0152 14.1128C12.8506 14.2774 12.7683 14.4878 12.7683 14.7439V28.3537C12.7683 28.6098 12.8506 28.8201 13.0152 28.9848C13.1799 29.1494 13.3902 29.2317 13.6463 29.2317H27.2561C27.5122 29.2317 27.7226 29.1494 27.8872 28.9848C28.0518 28.8201 28.1341 28.6098 28.1341 28.3537V19.3537H28.9024V28.3537C28.9024 28.8064 28.7412 29.194 28.4188 29.5164C28.0964 29.8388 27.7088 30 27.2561 30H13.6463ZM27.0366 17.1585V14.9634H24.8415V14.1951H27.0366V12H27.8049V14.1951H30V14.9634H27.8049V17.1585H27.0366ZM16.0061 26.3232H25.1159L22.3171 22.5915L19.5732 25.9939L17.8171 23.9634L16.0061 26.3232Z"
          fill="var(--md-sys-color-on-background)"
        />
      </svg>
    </>
  );
}
