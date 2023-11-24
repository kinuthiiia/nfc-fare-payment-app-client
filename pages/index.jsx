import {
  Avatar,
  Badge,
  Button,
  Drawer,
  HoverCard,
  Input,
  NumberInput,
  Switch,
  Tabs,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";

import { IconCheck, IconPlus, IconSearch } from "@tabler/icons";
import moment from "moment/moment";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [account, setAccount] = useState({
    name: "Stephen Kinyanjui",
    email: "s2kinyanjui@gmail.com",
    phoneNumber: "0748920306",
    smsAlerts: true,
    emailAlerts: false,
    image: null,
  });

  return (
    <div className="p-8">
      <div className="flex justify-end">
        <UnstyledButton onClick={() => setProfileOpen(true)}>
          <Avatar src="/avatar.png" alt="it's me" radius="sm" />
        </UnstyledButton>
      </div>
      <div className="mt-8">
        <p className="w-full text-center text-[1.3rem]">Hello Stephen!👋🏾</p>
        <h1 className="w-full text-center text-[3rem] font-semibold mt-2">
          Ksh. 4500
        </h1>
        <p className="w-full text-center  text-[#909090]">Available balance</p>
        <br />
        <div className="relative w-[calc(100%-64px)]">
          <Button
            leftIcon={<IconPlus />}
            color="dark"
            className="absolute left-[calc(50%-32px)]"
            onClick={() => setDrawerOpen(true)}
          >
            Load account
          </Button>
        </div>

        <Drawer
          position="bottom"
          opened={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <NumberInput
            hideControls
            thousandsSeparator=","
            size="xl"
            defaultValue={100}
            label="Amount"
            withAsterisk
          />

          <br />
          <br />
          <Button size="xl" color="dark" fullWidth>
            Load account with M-PESA
          </Button>
        </Drawer>

        <Drawer
          position="right"
          size="100%"
          opened={profileOpen}
          onClose={() => setProfileOpen(false)}
        >
          <div className="mt-8">
            <img
              src="/avatar.png"
              alt="profile"
              className="mx-auto w-[150px] h-[150px] object-cover"
            />
            <div className="relative">
              <Button.Group className="absolute left-[50%] translate-x-[-50%] mt-2">
                <Button variant="default">Remove</Button>
                <Button variant="default">Upload</Button>
              </Button.Group>
            </div>
          </div>
          <div className="mx-6 mt-[56px] space-y-8">
            <TextInput
              label="Name"
              placeholder="ex. John Doe"
              variant="unstyled"
              className="text-medium"
              value={account.name}
              onChange={(e) =>
                setAccount((account) => ({
                  ...account,
                  name: e.target.value,
                }))
              }
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              variant="unstyled"
              disabled
              className="text-medium"
              value={account.email}
            />
            <TextInput
              label="Name"
              placeholder="ex. 0748920306"
              variant="unstyled"
              className="text-medium"
              value={account.phoneNumber}
              onChange={(e) =>
                setAccount((account) => ({
                  ...account,
                  phoneNumber: e.target.value,
                }))
              }
            />
            <div className="flex justify-between">
              <div className="w-4/5">
                <p className="font-medium mb-2">SMS alerts</p>
                <p>
                  Send an SMS about the payment you just made to your phone
                  number
                </p>
              </div>
              <div className="relative">
                <Switch
                  className="absolute top-[50%] translate-y-[-50%]"
                  checked={account.smsAlerts}
                  onChange={(e) =>
                    setAccount((account) => ({
                      ...account,
                      smsAlerts: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-4/5">
                <p className="font-medium mb-2">Email alerts</p>
                <p>
                  Send an email about the payment you just made to your email
                  address
                </p>
              </div>
              <div className="relative">
                <Switch
                  className="absolute top-[50%] translate-y-[-50%]"
                  checked={account.emailAlerts}
                  onChange={(e) =>
                    setAccount((account) => ({
                      ...account,
                      emailAlerts: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-12">
            <Button fullWidth color="dark" size="lg">
              Save
            </Button>
            <Button color="red" variant="subtle" fullWidth size="lg">
              Log out
            </Button>
          </div>
        </Drawer>
      </div>

      <br />

      <Tabs color="dark" defaultValue="payments">
        <Tabs.List>
          <Tabs.Tab value="payments">Recent payments</Tabs.Tab>
          <Tabs.Tab value="tags">Tags</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="payments" pt="xs">
          <br />
          <Input icon={<IconSearch />} placeholder="Search" variant="filled" />
          {[1, 2, 3, 4].map((el) => (
            <Payment />
          ))}
        </Tabs.Panel>

        <Tabs.Panel value="tags" pt="xs">
          <br />
          {[1, 2].map((el) => (
            <Tag />
          ))}

          <div className="fixed bottom-4 w-[calc(100%-64px)]">
            <Button
              color="dark"
              style={{
                width: 64,
                height: 64,
                padding: 0,
              }}
              radius="xl"
              className="absolute left-[calc(50%-32px)]"
            >
              <IconPlus />
            </Button>
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

const Payment = ({ payment }) => {
  return (
    <div className="flex justify-between my-8">
      <div className="flex space-x-8">
        <div>
          <h1 className="font-medium text-[1.2rem]">New NNUS - KDJ 221R</h1>
          <p>{moment(Date.now()).format("Do MMM YYYY | HH:mm a")}</p>
        </div>
      </div>
      <h1 className="font-medium text-[1.2rem] text-red-600">-Ksh. 300</h1>
    </div>
  );
};

const Tag = ({ tag }) => {
  const [loading, setLoading] = useState(false);

  const deactivateTag = () => {
    notifications.show({
      title: "Tag deactivated!",
      icon: <IconCheck />,
      color: "green",
    });
  };

  return (
    <div className="bg-gray-200 p-6 my-4 rounded-lg flex justify-between">
      <div>
        <h1 className="font-medium text-[1.2rem]">Home keys</h1>
        <p>{`${moment(Date.now()).format("Do MMM YYYY")} - present`}</p>
        <Badge variant="filled" color="green">
          Active
        </Badge>
      </div>
      <div className="relative">
        <HoverCard width={200} position="bottom" withArrow shadow="md">
          <HoverCard.Target>
            <Button
              variant="outline"
              className="absolute top-[50%] translate-y-[-50%]"
              color="red"
            >
              Deactivate
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown sx={{ pointerEvents: "none" }}>
            <Text size="sm">
              Deactivating this tag means it will no longer be used to make fare
              payments. Are you sure you want to continue?
            </Text>
            <br />
            <Button
              loading={loading}
              fullWidth
              color="red"
              onClick={deactivateTag}
            >
              Yes , deactivate
            </Button>
          </HoverCard.Dropdown>
        </HoverCard>
      </div>
    </div>
  );
};
