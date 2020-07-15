package com.google.opensesame.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.KeyFactory;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Subclass;
import java.util.ArrayList;

@Subclass(index = true)
public class MentorEntity extends PersonEntity {
  ArrayList<Long> projectIDs;
  ArrayList<String> menteeIDs;

  private MentorEntity() {
    super();
  }
  
  public MentorEntity(PersonEntity person, ArrayList<Long> projectIDs, ArrayList<String> menteeIDs) {
    super(person.id, person.gitHubId, person.interestTags, person.email);
    this.projectIDs = projectIDs;
    this.menteeIDs = menteeIDs;
  }
}