import React from 'react'
import {TabList, Card, Tab, TabPanel, Button, Heading, Flex} from '@sanity/ui'
import {MobileDeviceIcon, DesktopIcon} from '@sanity/icons'
import {RenderCoreData} from '../components/RenderCoreData'
import {RenderCategoriesData} from '../components/RenderCategoriesData'
import {STATE_TYPE, LIST_DEVICES} from '../helpers/constants'
import {CustomSpinner} from '../components/CustomSpinner'
import styled from 'styled-components'

const DivContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`
const Link = styled.a`
  text-decoration: underline;
  color: #3c4043;
  font-size: 21px;
  :hover {
    color: #1a73e8;
  }
`
export const TabContainers = ({
  data,
  activeResult,
  isRefreshForDevice,
  id,
  setId,
  stateTabs,
  handleRefresh,
}) => {
  const mobileData = data[activeResult]?.mobile[0]
  const desktopData = data[activeResult]?.desktop[0]

  const renderContainerForRequest = (device) =>
    stateTabs === STATE_TYPE.loading || device === isRefreshForDevice ? (
      <CustomSpinner />
    ) : (
      <Button
        fontSize={[2, 2, 3]}
        padding={[1, 1, 3]}
        text="Request data"
        tone="primary"
        onClick={handleRefresh}
        disabled={stateTabs === STATE_TYPE.loading}
      />
    )
  console.log(data)
  const renderTabPanelData = (data, device) =>
    Boolean(data[activeResult][`${device}`]?.length) ? (
      <DivContainer>
        <Flex align={'center'} gap={1}>
          <Heading>Page tested:</Heading>
          <Link href={data[activeResult].mainInfo.linkReq} target="_blank" rel="noreferrer">
            {data[activeResult].mainInfo.linkReq}
          </Link>
        </Flex>
        <RenderCoreData
          data={device === LIST_DEVICES.desktop ? desktopData.core : mobileData.core}
        />
        <RenderCategoriesData
          data={device === LIST_DEVICES.desktop ? desktopData.performance : mobileData.performance}
        />
      </DivContainer>
    ) : (
      renderContainerForRequest(device)
    )

  return (
    <Card padding={4}>
      <TabList space={2}>
        <Tab
          icon={DesktopIcon}
          id="desktop-tab"
          label="Desktop"
          onClick={() => setId(LIST_DEVICES.desktop)}
          selected={id === LIST_DEVICES.desktop}
          space={2}
        />
        <Tab
          icon={MobileDeviceIcon}
          id="mobile-tab"
          label="Mobile"
          onClick={() => setId(LIST_DEVICES.mobile)}
          selected={id === LIST_DEVICES.mobile}
          space={2}
        />
      </TabList>

      <TabPanel hidden={id !== LIST_DEVICES.desktop} id="desktop-panel">
        <Card border marginTop={2} padding={4} radius={2}>
          {isRefreshForDevice === LIST_DEVICES.desktop ? (
            <CustomSpinner />
          ) : (
            renderTabPanelData(data, LIST_DEVICES.desktop)
          )}
        </Card>
      </TabPanel>

      <TabPanel hidden={id !== LIST_DEVICES.mobile} id="mobile-panel">
        <Card border marginTop={2} padding={4}>
          {isRefreshForDevice === LIST_DEVICES.mobile ? (
            <CustomSpinner />
          ) : (
            renderTabPanelData(data, LIST_DEVICES.mobile)
          )}
        </Card>
      </TabPanel>
    </Card>
  )
}
