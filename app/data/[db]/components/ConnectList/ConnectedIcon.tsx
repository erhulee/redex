import {
  SmileOutlined,
  FrownOutlined,
  FrownFilled,
  SmileFilled,
} from "@ant-design/icons";
type Props = {
  selected: boolean;
  active: boolean;
};

function ConnectedIcon(props: Props) {
  const { selected, active } = props;
  const Icon = () => {
    if (selected) {
      return active ? <SmileFilled /> : <FrownFilled></FrownFilled>;
    } else {
      return active ? <SmileOutlined /> : <FrownOutlined></FrownOutlined>;
    }
  };

  return (
    <span className={`${active ? "text-success-500" : "text-danger-500"}`}>
      <Icon></Icon>
    </span>
  );
}

export default ConnectedIcon;
