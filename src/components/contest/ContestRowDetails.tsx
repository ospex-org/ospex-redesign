import React from 'react';
import { Box, Flex, Tabs, TabList, Tab, TabPanels, TabPanel, useBreakpointValue } from '@chakra-ui/react';
import { Contest } from '../../types';
import BetTypePanel from './BetTypePanel';
import { useRadioGroup } from '@chakra-ui/react';

interface ContestRowDetailsProps {
  contest: Contest;
  isOpen: boolean;
}

const ContestRowDetails: React.FC<ContestRowDetailsProps> = ({ contest, isOpen }) => {
  // State management
  const [spreadSelection, setSpreadSelection] = React.useState("");
  const [moneylineSelection, setMoneylineSelection] = React.useState("");
  const [totalSelection, setTotalSelection] = React.useState("");
  const [betAmount, setBetAmount] = React.useState(1);
  const [contributeAmount, setContributeAmount] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(0);
  const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);

  // Radio group hooks
  const spreadRadioProps = useRadioGroup({
    value: spreadSelection,
    onChange: (value) => setSpreadSelection(value === spreadSelection ? "" : value)
  });

  const moneylineRadioProps = useRadioGroup({
    value: moneylineSelection,
    onChange: (value) => setMoneylineSelection(value === moneylineSelection ? "" : value)
  });

  const totalRadioProps = useRadioGroup({
    value: totalSelection,
    onChange: (value) => setTotalSelection(value === totalSelection ? "" : value)
  });

  const slideoutHeight = useBreakpointValue({
    base: '144px',
    '@media screen and (max-width: 618px)': '200px',
    '@media screen and (max-width: 400px)': '250px'
  });

  const tabLabels = useBreakpointValue({
    base: [
      { label: 'Spread' },
      { label: 'Moneyline' },
      { label: 'Total' }
    ],
    '@media screen and (max-width: 400px)': [
      { label: 'Spread' },
      { label: 'ML' },
      { label: 'Total' }
    ]
  }) || [
    { label: 'Spread' },
    { label: 'Moneyline' },
    { label: 'Total' }
  ];

  const isMobile = useBreakpointValue({ base: true, sm: false });

  const getButtonLabel = (label: string) => {
    if (isMobile && label === 'Moneyline') {
      return 'ML';
    }
    return label;
  };

  return (
    <Box
      sx={{
        '--slideout-height': '144px',
        '@media screen and (max-width: 618px)': {
          '--slideout-height': '240px'
        },
        '@media screen and (max-width: 400px)': {
          '--slideout-height': '280px'
        },
        height: isOpen ? 'var(--slideout-height)' : '0',
        transition: 'height 0.3s ease-in-out'
      }}
      overflow="hidden"
      bg="black"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `repeating-linear-gradient(45deg, rgba(45, 55, 72, 0.1) 0px, rgba(45, 55, 72, 0.1) 1px, transparent 1px, transparent 10px)`
      }}
    >
      <Flex 
        p={4} 
        justify="flex-start"
        opacity={isOpen ? 1 : 0}
        transition="opacity 0.2s"
        position="relative"
      >
        <Box 
          display={{ base: 'none', xl: 'block' }}
          width={{ base: '0%', xl: '47%' }}
          sx={{
            '@media screen and (min-width: 1280px) and (max-width: 1410px)': {
              width: '41%'  // Adjusted width for this specific range
            }
          }}
        >
          {/* Future content: stats, write-ups, etc. */}
        </Box>

        <Box 
          width={{ base: '100%', xl: '53%' }}
          position="relative"
          maxWidth={{ base: '600px', xl: 'none' }}
          mx={{ base: 'auto', xl: '0' }}
          sx={{
            '@media screen and (min-width: 1280px) and (max-width: 1410px)': {
              width: '59%'  // Adjusted width for this specific range
            }
          }}
        >
          <Tabs 
            variant="soft-rounded" 
            colorScheme="blue" 
            orientation="vertical" 
            onChange={setActiveTab}
            sx={{
              marginLeft: { base: 0, md: '-2rem' },
              '.chakra-tabs__tablist': {
                marginLeft: 0,
                paddingLeft: 0
              },
              '@media screen and (max-width: 400px)': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }
            }}
          >
            <Flex 
              gap={{ base: 2, xl: 6 }}
              ml={0}
              pl={0}
              sx={{
                '@media screen and (max-width: 400px)': {
                  flexDirection: 'column'
                }
              }}
            >
              <TabList 
                flexDirection="column" 
                gap={2}
                width={{ base: "100px", xl: "120px" }}
                ml={0}
                pl={0}
                sx={{
                  '@media screen and (max-width: 400px)': {
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 1,
                    mb: 2,
                    '& > *': {
                      marginLeft: '2px',
                      marginRight: '2px'
                    }
                  }
                }}
              >
                {['Spread', 'Moneyline', 'Total'].map((label) => (
                  <Tab 
                    key={label}
                    justifyContent="flex-start"
                    px={{ base: 2, xl: 4 }}
                    py={2}
                    _selected={{ 
                      bg: 'gray.700',
                      color: 'white' 
                    }}
                    sx={{
                      '@media screen and (max-width: 400px)': {
                        flex: '0 0 auto',
                        minWidth: '50px',
                        maxWidth: '60px',
                        justifyContent: 'center',
                        px: 1,
                        py: 1,
                        fontSize: 'sm'
                      }
                    }}
                  >
                    <Box>
                      {getButtonLabel(label)}
                    </Box>
                  </Tab>
                ))}
              </TabList>

              <TabPanels 
                width={{ base: "calc(100% - 110px)", xl: "calc(100% - 140px)" }}
                pl={0}
                sx={{
                  '@media screen and (max-width: 400px)': {
                    width: '100%',
                    pl: 0,
                    pr: 0,
                    mx: 0  // Remove any margin
                  }
                }}
              >
                <TabPanel 
                  p={0} 
                  height="100%"
                  pl={0}
                >
                  <BetTypePanel
                    type="spread"
                    contest={contest}
                    selection={spreadSelection}
                    radioProps={spreadRadioProps}
                    betAmount={betAmount}
                    setBetAmount={setBetAmount}
                    contributeAmount={contributeAmount}
                    setContributeAmount={setContributeAmount}
                  />
                </TabPanel>

                <TabPanel p={0} height="100%">
                  <BetTypePanel
                    type="moneyline"
                    contest={contest}
                    selection={moneylineSelection}
                    radioProps={moneylineRadioProps}
                    betAmount={betAmount}
                    setBetAmount={setBetAmount}
                    contributeAmount={contributeAmount}
                    setContributeAmount={setContributeAmount}
                  />
                </TabPanel>

                <TabPanel p={0} height="100%">
                  <BetTypePanel
                    type="total"
                    contest={contest}
                    selection={totalSelection}
                    radioProps={totalRadioProps}
                    betAmount={betAmount}
                    setBetAmount={setBetAmount}
                    contributeAmount={contributeAmount}
                    setContributeAmount={setContributeAmount}
                  />
                </TabPanel>
              </TabPanels>
            </Flex>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContestRowDetails; 