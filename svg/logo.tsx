import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  G,
  Path,
  Circle,
  Text,
  Line,
  SvgProps,
  RadialGradient,
} from "react-native-svg";

export const LogoOne = (props: SvgProps) => (
  <Svg viewBox="0 0 512 512"  {...props}>
    <Defs>
      <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
        <Stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <Rect width={512} height={512} rx={110} fill="url(#bgGrad)" />
    <G transform="translate(256, 256)">
      <G opacity={0.9}>
        <Path
          d="M -90,-40 L -90,120 L -30,140 L -30,-20 Z"
          fill="#a78bfa"
          opacity={0.6}
        />
        <Path d="M -30,-60 L -30,140 L 40,140 L 40,-40 Z" fill="#ffffff" />
        <Path d="M 40,-80 L 40,120 L 100,100 L 100,-100 Z" fill="#e0e7ff" />
        <Rect
          x={-20}
          y={-40}
          width={15}
          height={15}
          fill="#6366f1"
          opacity={0.7}
          rx={2}
        />
        <Rect
          x={-20}
          y={-15}
          width={15}
          height={15}
          fill="#6366f1"
          opacity={0.7}
          rx={2}
        />
        <Rect
          x={-20}
          y={10}
          width={15}
          height={15}
          fill="#6366f1"
          opacity={0.7}
          rx={2}
        />
        <Rect
          x={-20}
          y={35}
          width={15}
          height={15}
          fill="#6366f1"
          opacity={0.7}
          rx={2}
        />
        <Rect
          x={5}
          y={-40}
          width={15}
          height={15}
          fill="#6366f1"
          opacity={0.7}
          rx={2}
        />
        <Rect
          x={5}
          y={-15}
          width={15}
          height={15}
          fill="#6366f1"
          opacity={0.7}
          rx={2}
        />
        <Rect
          x={5}
          y={10}
          width={15}
          height={15}
          fill="#6366f1"
          opacity={0.7}
          rx={2}
        />
        <Rect
          x={5}
          y={35}
          width={15}
          height={15}
          fill="#6366f1"
          opacity={0.7}
          rx={2}
        />
        <Rect
          x={50}
          y={-70}
          width={12}
          height={12}
          fill="#8b5cf6"
          opacity={0.5}
          rx={2}
        />
        <Rect
          x={50}
          y={-50}
          width={12}
          height={12}
          fill="#8b5cf6"
          opacity={0.5}
          rx={2}
        />
        <Rect
          x={50}
          y={-30}
          width={12}
          height={12}
          fill="#8b5cf6"
          opacity={0.5}
          rx={2}
        />
        <Rect
          x={50}
          y={-10}
          width={12}
          height={12}
          fill="#8b5cf6"
          opacity={0.5}
          rx={2}
        />
        <Rect
          x={70}
          y={-70}
          width={12}
          height={12}
          fill="#8b5cf6"
          opacity={0.5}
          rx={2}
        />
        <Rect
          x={70}
          y={-50}
          width={12}
          height={12}
          fill="#8b5cf6"
          opacity={0.5}
          rx={2}
        />
        <Rect
          x={70}
          y={-30}
          width={12}
          height={12}
          fill="#8b5cf6"
          opacity={0.5}
          rx={2}
        />
        <Rect
          x={70}
          y={-10}
          width={12}
          height={12}
          fill="#8b5cf6"
          opacity={0.5}
          rx={2}
        />
      </G>
      <G filter="url(#glow)">
        <Circle cx={-60} cy={-100} r={55} fill="#fbbf24" opacity={0.95} />
        <Circle cx={-60} cy={-100} r={48} fill="#ffffff" opacity={0.2} />
        <Text
          x={-60}
          y={-80}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize={56}
          fontWeight={900}
          fill="#7c3aed"
          textAnchor="middle"
          letterSpacing={-2}
        >
          {"PG"}
        </Text>
      </G>
      <Line
        x1={-100}
        y1={140}
        x2={110}
        y2={140}
        stroke="#fbbf24"
        strokeWidth={8}
        strokeLinecap="round"
        opacity={0.8}
      />
    </G>
    <Circle cx={420} cy={92} r={8} fill="#fbbf24" opacity={0.6} />
    <Circle cx={92} cy={420} r={8} fill="#fbbf24" opacity={0.6} />
  </Svg>
);


export const LogoTwo = (props: SvgProps) => (
  <Svg viewBox="0 0 512 512"  {...props}>
    <Rect width={512} height={512} rx={100} fill="#2563eb" />
    <G transform="translate(256, 256)">
      <Rect x={-80} y={-100} width={160} height={180} fill="#ffffff" rx={8} />
      <Rect x={-60} y={-80} width={30} height={25} fill="#2563eb" rx={3} />
      <Rect x={-20} y={-80} width={30} height={25} fill="#2563eb" rx={3} />
      <Rect x={20} y={-80} width={30} height={25} fill="#2563eb" rx={3} />
      <Rect x={-60} y={-45} width={30} height={25} fill="#2563eb" rx={3} />
      <Rect x={-20} y={-45} width={30} height={25} fill="#2563eb" rx={3} />
      <Rect x={20} y={-45} width={30} height={25} fill="#2563eb" rx={3} />
      <Rect x={-60} y={-10} width={30} height={25} fill="#2563eb" rx={3} />
      <Rect x={-20} y={-10} width={30} height={25} fill="#2563eb" rx={3} />
      <Rect x={20} y={-10} width={30} height={25} fill="#2563eb" rx={3} />
      <Rect x={-25} y={35} width={50} height={45} fill="#2563eb" rx={4} />
      <Circle cx={10} cy={57.5} r={3} fill="#ffffff" />
      <Circle cx={0} cy={-130} r={45} fill="#fbbf24" />
      <Text
        x={0}
        y={-115}
        fontFamily="Arial, sans-serif"
        fontSize={48}
        fontWeight="bold"
        fill="#1e40af"
        textAnchor="middle"
      >
        {"PG"}
      </Text>
    </G>
  </Svg>
);


const LogoThere = (props: SvgProps) => (
  <Svg viewBox="0 0 512 512"  {...props}>
    <Defs>
      <LinearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#2E7EF5" stopOpacity={1} />
        <Stop offset="50%" stopColor="#1D61E7" stopOpacity={1} />
        <Stop offset="100%" stopColor="#1450C9" stopOpacity={1} />
      </LinearGradient>
      <LinearGradient id="lightBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
        <Stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
      </LinearGradient>
      <RadialGradient id="radialBlue" cx="50%" cy="50%" r="50%">
        <Stop offset="0%" stopColor="#2E7EF5" stopOpacity={1} />
        <Stop offset="100%" stopColor="#1450C9" stopOpacity={1} />
      </RadialGradient>
    </Defs>
    <Rect width={512} height={512} rx={120} fill="url(#blueGrad)" />
    <Circle cx={256} cy={256} r={300} fill="url(#radialBlue)" opacity={0.3} />
    <G transform="translate(256, 300)">
      <G opacity={0.9} filter="url(#whiteGlow)">
        <Path
          d="M -120,0 L -120,-80 L -60,-110 L -60,-30 Z"
          fill="#ffffff"
          opacity={0.15}
        />
        <Path
          d="M -120,-80 L -60,-110 L -60,-30 L -120,0 Z"
          fill="#ffffff"
          opacity={0.25}
        />
        <Path
          d="M -60,-110 L -60,20 L 60,20 L 60,-110 Z"
          fill="#ffffff"
          opacity={0.95}
        />
        <Path
          d="M 60,-110 L 120,-80 L 120,0 L 60,-30 Z"
          fill="#ffffff"
          opacity={0.2}
        />
        <Path
          d="M 60,-30 L 120,0 L 120,0 L 60,20 Z"
          fill="#ffffff"
          opacity={0.3}
        />
      </G>
      <G opacity={0.7}>
        <Rect
          x={-45}
          y={-95}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={-20}
          y={-95}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={5}
          y={-95}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={30}
          y={-95}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={-45}
          y={-65}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={-20}
          y={-65}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={5}
          y={-65}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={30}
          y={-65}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={-45}
          y={-35}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={-20}
          y={-35}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={5}
          y={-35}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={30}
          y={-35}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={-45}
          y={-5}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={-20}
          y={-5}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={5}
          y={-5}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
        <Rect
          x={30}
          y={-5}
          width={18}
          height={18}
          fill="#1D61E7"
          rx={3}
          opacity={0.4}
        />
      </G>
      <Line
        x1={-120}
        y1={25}
        x2={120}
        y2={25}
        stroke="#ffffff"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.4}
      />
    </G>
    <G transform="translate(256, 160)">
      <Circle
        cx={0}
        cy={0}
        r={100}
        fill="#ffffff"
        opacity={0.08}
        filter="url(#strongWhiteGlow)"
      />
      <Circle
        cx={0}
        cy={0}
        r={90}
        fill="#ffffff"
        opacity={0.98}
        filter="url(#whiteGlow)"
      />
      <Circle
        cx={0}
        cy={0}
        r={85}
        fill="none"
        stroke="#1D61E7"
        strokeWidth={2}
        opacity={0.15}
      />
      <Circle
        cx={0}
        cy={0}
        r={78}
        fill="none"
        stroke="#1D61E7"
        strokeWidth={1.5}
        opacity={0.1}
      />
      <G>
        <Path
          d="M -50,-35 L -50,40 M -50,-35 L -15,-35 Q 0,-35 0,-17 Q 0,1 -15,1 L -50,1"
          fill="none"
          stroke="#1D61E7"
          strokeWidth={13}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.95}
        />
        <Path
          d="M 50,-20 L 30,-35 Q 10,-35 10,-15 L 10,15 Q 10,35 30,35 L 45,35 L 45,8 L 25,8"
          fill="none"
          stroke="#1D61E7"
          strokeWidth={13}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.95}
        />
      </G>
      <Circle
        cx={0}
        cy={0}
        r={72}
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        opacity={0.5}
      />
    </G>
    <G opacity={0.3}>
      <Circle cx={90} cy={90} r={5} fill="#ffffff" />
      <Circle cx={422} cy={90} r={5} fill="#ffffff" />
      <Circle cx={90} cy={422} r={5} fill="#ffffff" />
      <Circle cx={422} cy={422} r={5} fill="#ffffff" />
      <Line
        x1={90}
        y1={90}
        x2={120}
        y2={90}
        stroke="#ffffff"
        strokeWidth={2}
        opacity={0.5}
      />
      <Line
        x1={90}
        y1={90}
        x2={90}
        y2={120}
        stroke="#ffffff"
        strokeWidth={2}
        opacity={0.5}
      />
      <Line
        x1={422}
        y1={90}
        x2={392}
        y2={90}
        stroke="#ffffff"
        strokeWidth={2}
        opacity={0.5}
      />
      <Line
        x1={422}
        y1={90}
        x2={422}
        y2={120}
        stroke="#ffffff"
        strokeWidth={2}
        opacity={0.5}
      />
      <Line
        x1={90}
        y1={422}
        x2={120}
        y2={422}
        stroke="#ffffff"
        strokeWidth={2}
        opacity={0.5}
      />
      <Line
        x1={90}
        y1={422}
        x2={90}
        y2={392}
        stroke="#ffffff"
        strokeWidth={2}
        opacity={0.5}
      />
      <Line
        x1={422}
        y1={422}
        x2={392}
        y2={422}
        stroke="#ffffff"
        strokeWidth={2}
        opacity={0.5}
      />
      <Line
        x1={422}
        y1={422}
        x2={422}
        y2={392}
        stroke="#ffffff"
        strokeWidth={2}
        opacity={0.5}
      />
    </G>
  </Svg>
);
