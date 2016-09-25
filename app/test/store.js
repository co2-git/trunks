import should from 'should';
import Immutable from 'immutable';
import React from 'react';
import Trunk from '../Trunk';

class Store extends Trunk {
  static store = Trunk.map({status: null});
  ready() {
    this.set({status: 'ready'});
  }
}

function Elem(props) {
  return <div>Hello</div>;
}

describe('Store', () => {
  describe('Trunk', () => {
    describe('Class', () => {
      it('should be a class', () => {
        should(Trunk).be.a.Function();
      });
      it('should have a static id', () => {
        should(Trunk).have.property('id').which.eql(0);
      });
      it('should have an immutable store', () => {
        should(Trunk).have.property('store').which.is.an.instanceof(Immutable.Map);
      });
      it('should have a map function', () => {
        should(Trunk).have.property('map')
          .which.is.a.Function()
          .and.eql(Immutable.Map);
      });
      it('should have an array of trunks', () => {
        should(Trunk).have.property('trunks').which.is.an.Array();
      });
      it('should a set function', () => {
        should(Trunk).have.property('set').which.is.a.Function();
      });
      it('should have an add trunk function', () => {
        should(Trunk).have.property('addTrunk').which.is.a.Function();
      });
    });
    describe('Instance', () => {
      let store;
      before(() => {
        store = new Store(Elem);
      });
      it('should have element', () => {
        should(store).have.property('elem').which.eql(Elem);
      });
      it('should have a name', () => {
        should(store).have.property('name').which.eql('Store');
      });
      it('should have an id', () => {
        should(store).have.property('id').which.eql(0);
      });
      it('should have the static store', () => {
        should(store).have.property('store').which.eql(Store.store);
      });
    });
  });
});
