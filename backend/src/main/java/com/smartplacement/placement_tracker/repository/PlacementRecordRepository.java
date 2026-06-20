package com.smartplacement.placement_tracker.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.smartplacement.placement_tracker.model.PlacementRecord;

public interface PlacementRecordRepository extends JpaRepository<PlacementRecord, Long> {
}

