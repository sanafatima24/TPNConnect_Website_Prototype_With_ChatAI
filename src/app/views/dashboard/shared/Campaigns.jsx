import { Small } from "app/components/Typography";
import { MatxProgressBar, SimpleCard } from "app/components";
export default function Campaigns() {
  return (
    <div>
      <SimpleCard title="Delivery Progress Status">
        {/* <Small color="text.secondary">Inbound Operation Status</Small> */}
        <MatxProgressBar value={85} color="primary" text="Must Deliver Today (85)" />
        <MatxProgressBar value={19} color="secondary" text="Out for Delivery (19)" />
        <MatxProgressBar value={55} color="primary" text="Delivered - POD (55)" />

        {/* <Small color="text.secondary" display="block" pt={4}>
         Outbound Operation Status
        </Small>
        <MatxProgressBar value={59} color="primary" text="ND (59)" />
        <MatxProgressBar value={22} color="secondary" text="EC (22)" />
        <MatxProgressBar value={0} color="primary" text="RL (0)" /> */}

        {/* <Small color="text.secondary" display="block" pt={4}>
          Yesterday
        </Small>
        <MatxProgressBar value={75} color="primary" text="Google (102k)" />
        <MatxProgressBar value={45} color="secondary" text="Twitter (40k)" />
        <MatxProgressBar value={75} color="primary" text="Tensor (80k)" /> */}
      </SimpleCard>
    </div>
  );
}
