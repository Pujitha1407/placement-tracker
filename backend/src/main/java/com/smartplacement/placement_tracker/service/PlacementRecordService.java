package com.smartplacement.placement_tracker.service;

import com.smartplacement.placement_tracker.model.PlacementRecord;
import com.smartplacement.placement_tracker.repository.PlacementRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacementRecordService {

    private final PlacementRecordRepository placementRecordRepository;

    public PlacementRecordService(PlacementRecordRepository placementRecordRepository) {
        this.placementRecordRepository = placementRecordRepository;
    }

    public List<PlacementRecord> getAllRecords() {
        return placementRecordRepository.findAll();
    }

    public PlacementRecord getRecordById(Long id) {
        return placementRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement record not found"));
    }

    public PlacementRecord saveRecord(PlacementRecord record) {
        return placementRecordRepository.save(record);
    }

    public void deleteRecord(Long id) {
        placementRecordRepository.deleteById(id);
    }
}
