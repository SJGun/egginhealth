package com.egginhealth.data.repository;

import com.egginhealth.data.entity.ChatRoom;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends CrudRepository<ChatRoom, String> {

}
