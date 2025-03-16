import { StyleSheet, View } from 'react-native';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { TabButton } from '@/components/TabButton';
import { NewLogButton } from '@/components/NewLogButton';

export default function TabLayout() {
    return (
        <Tabs>
            <TabSlot />
            <TabList style={styles.tabWrapper}>
                <TabTrigger name="home" href="/" style={styles.tab} asChild>
                    <TabButton iconName="calendar" iconSize={24} />
                </TabTrigger>
                <NewLogButton style={styles.newLogButton}/>
                <TabTrigger name="summary" href="/summary" style={styles.tab} asChild>
                    <TabButton iconName="bar-chart-2" iconSize={24} />
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}


const styles = StyleSheet.create({
    tabWrapper: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        paddingBottom: 32,
        paddingTop: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: -2,
        },
    },
    tab: {
        textAlign: 'center',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    newLogButton: {
        zIndex: 10,
    },
});

