import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listRepos} from './reducer';
import {FlatList, View, Text, StyleSheet, ActivityIndicator} from 'react-native';

class RepoList extends Component {

    componentDidMount() {
        this.props.listRepos('poorvasingh09');
    }
    renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text>{item.name}</Text>
        </View>
      );

    render() {
        const {repos} = this.props;
        const {isLoading} = this.props;
        const {error} = this.props;
        return (
            <View styles={styles.container}>
            {error && <Text style={{padding: 20, paddingTop: 40}}>{error}</Text>}
            <FlatList 
                data={repos}
                renderItem={this.renderItem}
            />
            <ActivityIndicator size="large" color="#0000ff" animating={isLoading}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
});

const mapStateToProps = state => {
    let storedProps = state.repos.map(repo => ({key:repo.id.toString(), ...repo}));
    
    return {
        repos: storedProps,
        isLoading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = {
    listRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoList);